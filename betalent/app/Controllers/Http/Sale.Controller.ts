import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { SaleDTO, SaleIndexDTO } from 'App/DTO/SaleDTO';
import Client from 'App/Models/Client';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';
import {
  FormatDataSaleToReturnShow,
  FormatDataSaleToReturn,
  FormatDate,
} from 'App/Utils/handleFormatDataToReturn';
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg';
import { DateTime } from 'luxon';

export default class SaleController {
  constructor(
    private saleModel = Sale,
    private productModel = Product,
    private clientModel = Client,
    private returnDefaultResponse = ReturnDefaultMsg,
    private returnDataSaleStore = FormatDataSaleToReturn,
    private formatDataSaleToReturnShow = FormatDataSaleToReturnShow,
  ) {}

  public async store({
    request,
    response,
  }: HttpContextContract): Promise<void | SaleDTO> {

    const trx = await Database.transaction(); // Iniciar uma transação

    try {
      const { client_id, product_id, quantity } = request.only(['client_id', 'product_id', 'quantity', 'unity_price']);

      // Buscar o produto e aplica a transação
      const product = await this.productModel.findOrFail(product_id);
      product.useTransaction(trx);

      const client = await this.clientModel.findOrFail(client_id);

      // Calcular o preço total
      const total_price = quantity * product.price;

      // Atualizar o estoque do produto
      product.stock -= quantity
      await product.save();

      // Criar a venda com a transação
      const dataToDB = {
        client_id,
        product_id,
        quantity,
        unity_price: product.price,
        total_price,
        created_at: DateTime.now(),
      }

      const sale = await this.saleModel.create(dataToDB, { client: trx });
      
      const dataToReturn = {
        ...dataToDB,
        client_name: client.name,
        product_name: product.name,
        sale_date: FormatDate(sale.created_at),
      };
      
      // Retornar a venda criada com os dados formatados
      const data = this.returnDataSaleStore(dataToReturn);


      await trx.commit();

      response.status(200);

      return {
        data
      };
    } catch (error) {
      await trx.rollback();
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      });
    }
  }

  public async index({ response }: HttpContextContract): Promise<void | SaleIndexDTO> {
    try {
      const sales = await this.saleModel
      .query()
      .orderBy('id', 'desc')
      .where('is_deleted', false);

      const mappingSales = await Promise.all(sales.map(async (sale) => {
        const product = await this.productModel.findOrFail(sale.product_id);
        const client = await this.clientModel.findOrFail(sale.client_id);

        const dataToReturn = this.formatDataSaleToReturnShow({
          sale,
          client,
          product
        });

        return dataToReturn;
      }));      

      response.status(200);

      return {
        data: mappingSales
      };
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      });
    }
  }

  public async show({
    params,
    response,
  }: HttpContextContract): Promise<void | SaleDTO> {

    try {
      const sale = await this.saleModel
      .query()
      .where('id', params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!sale) return response.status(404).json(this.returnDefaultResponse.saleNotFound);

      const client = await this.clientModel.findOrFail(sale.client_id);
      const product = await this.productModel.findOrFail(sale.product_id);

      const data = this.formatDataSaleToReturnShow({ sale, client, product });
      response.status(200);

      return {
        data,
      };
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      });
    }
  }

  public async destroy ({
    response,
    params,
  }: HttpContextContract): Promise<void> {

    const trx = await Database.transaction(); // Iniciar uma transação

    try {
      // Busca a venda pelo id
      const getSales = await this.saleModel
      .query()
      .where('id', +params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!getSales) {
        await trx.rollback();
        return response.status(404).json(this.returnDefaultResponse.saleNotFound);
      }

      getSales.useTransaction(trx);

      const getProduct = await this.productModel.findBy('id', getSales.product_id);
      getProduct?.useTransaction(trx);

      // Verifica se a venda e o produto existe
      if (!getSales || !getProduct) {
        await trx.rollback();
        return response.status(404).json(this.returnDefaultResponse.saleNotFound);
      };      

      // Atualiza a venda para deletada
      getSales.is_deleted = true;
      await getSales.save();

      // Atualiza o estoque do produto
      getProduct.stock += getSales?.quantity;
      await getProduct.save();

      await trx.commit();

      response.status(204);

      return;
    } catch (error) {
      await trx.rollback();
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      });
    }
  } 
}
