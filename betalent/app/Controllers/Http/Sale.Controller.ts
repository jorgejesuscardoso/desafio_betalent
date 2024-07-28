import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { SaleDTO, SaleIndexDTO } from 'App/DTO/SaleDTO';
import Client from 'App/Models/Client';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';
import {
  FormatDataSaleShow,
  FormatDataSale,
  FormatDataSaleIndex,
} from 'App/Utils/formatData';
import { DefaultMsg } from 'App/Utils/defaultMsg';

export default class SaleController {
  constructor(
    private saleModel = Sale,
    private productModel = Product,
    private clientModel = Client,
    private defaultResponse = DefaultMsg,
    private formatDataSaleStore = FormatDataSale,
    private formatDataSaleIndex = FormatDataSaleIndex,
    private formatDataSaleShow = FormatDataSaleShow,
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

      // Verificar se o cliente existe
      const client = await this.clientModel.findOrFail(client_id); // Sem transação, pois é apenas uma consulta

      // Calcular o preço total
      const total_price = quantity * product.price;

      // Atualizar o estoque do produto
      product.stock -= quantity
      await product.save();

      // Criar a venda com a transação
      const saleData = {
        client_id,
        product_id,
        quantity,
        unity_price: product.price,
        total_price,
      }

      const sale = await this.saleModel.create(saleData, { client: trx });      
       
      // Retornar a venda criada com os dados formatados
      const data = this.formatDataSaleStore({ sale, client, product });


      await trx.commit();

      response.status(200);

      return {
        data
      };
    } catch (error) {
      await trx.rollback();
      return response.status(500).json({
        ...this.defaultResponse.serverError,
        error: error.message,
      });
    }
  }

  public async index({ response }: HttpContextContract): Promise<void | SaleIndexDTO> {
    try {
      const sales = await this.saleModel
        .query()
        .preload('client')
        .preload('product')
        .orderBy('id', 'desc');


      const data = sales.map((sale) => {
        const product = sale.product;
        const client = sale.client;

        const dataSales = this.formatDataSaleIndex({
          sale,
          client,
          product
        });

        return dataSales;
      });      

      response.status(200);

      return {
        data
      };
    } catch (error) {
      return response.status(500).json({
        ...this.defaultResponse.serverError,
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
      .preload('client')
      .preload('product')
      .first();

      if (!sale) return response.status(404).json(this.defaultResponse.saleNotFound);

      const data = this.formatDataSaleShow({
        sale, client: sale.client,
        product: sale.product,
      });
      response.status(200);

      return {
        data,
      };
    } catch (error) {
      return response.status(500).json({
        ...this.defaultResponse.serverError,
        error: error.message,
      });
    }
  }

  // A rota de update não é necessária, pois não faz sentido atualizar uma venda
  public async update({ response }: HttpContextContract): Promise<void> {
    return response.status(405).json(this.defaultResponse.methodNotAllowed);
  }

  // Para deletar uma venda, a melhor opção seria criar um campo is_deleted e setar como true.
  public async destroy({ response }: HttpContextContract): Promise<void> {
    return response.status(405).json(this.defaultResponse.methodNotAllowed);
  }

  // Exemplo de como seria a função destroy, caso fosse necessário deletar uma venda
  /* public async destroy ({
    response,
    params,
  }: HttpContextContract): Promise<void> {

    const trx = await Database.transaction(); // Iniciar uma transação

    try {
      // Busca a venda pelo id
      const sale = await this.saleModel
        .query()
        .where('id', params.id)
        .andWhere('is_deleted', false)
        .preload('product')
        .first();
      
        
      if (!sale) {
        await trx.rollback();
        return response.status(404).json(this.defaultResponse.saleNotFound);
      }
      sale.useTransaction(trx);

      // Busca o produto pelo id
      const product = await sale.product;
      product.useTransaction(trx);

      const updatedStock = product.stock + sale.quantity;
      
      // Atualiza o estoque do produto
      await product.merge({ stock: updatedStock }).save();

      // Deleta a venda
      //await sale.delete(); // Essa opção deleta a venda do banco de dados, não é recomendado
      await sale.merge({ is_deleted: true }).save(); // Essa opção seta o campo is_deleted como true. Soft delete

      await trx.commit();

      return;
    } catch (error) {
      await trx.rollback();
      return response.status(500).json({
        ...this.defaultResponse.serverError,
        error: error.message,
      });
    }
  } */
} 

