import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import { ReturnDataSaleStore } from 'App/Utils/handleReturnData'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'

export default class SaleController {
  constructor(
    private saleModel = Sale,
    private productModel = Product,
    private clientModel = Client,
    private returnDefaultResponse = ReturnDefaultMsg,
    private returnDataSaleStore = ReturnDataSaleStore,
  ) {}

  public async store({ request, response }: HttpContextContract) {
    const trx = await Database.transaction() // Iniciar uma transação

    try {
      const { client_id, product_id, quantity } = request.only(['client_id', 'product_id', 'quantity', 'unity_price'])

      // Buscar o produto e aplica a transação
      const product = await this.productModel.findOrFail(product_id)
      product.useTransaction(trx)

      const client = await this.clientModel.findOrFail(client_id)

      // Calcular o preço total
      const total_price = quantity * product.price;

      // Atualizar o estoque do produto
      product.stock -= quantity
      await product.save()

      // Criar a venda com a transação
      const dataToDB = {
        client_id,
        product_id,
        quantity,
        unity_price: product.price,
        total_price
      }

      const sale = await this.saleModel.create(dataToDB, { client: trx })
      
      const dataToReturn = {
        ...dataToDB,
        client_name: client.name,
        product_name: product.name,
        date: sale.createdAt,
      }
      // Retornar a venda criada com os dados formatados
      const dataResponse = this.returnDataSaleStore(dataToReturn);


      await trx.commit()

      response.status(200);

      return {
        ...this.returnDefaultResponse.salesCreated,
        data: dataResponse,
      }
    } catch (error) {
      await trx.rollback()
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const sales = await this.saleModel.query().orderBy('id', 'desc').where('is_deleted', false);

      if (!sales) return response.status(200).json([])

      response.status(200)

      return {
        ...this.returnDefaultResponse.ok,
        data: sales,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const sale = await this.saleModel.query().where('id', params.id).andWhere('is_deleted', false).first();

      if (!sale) return response.status(404).json(this.returnDefaultResponse.saleNotFound)

      response.status(200)

      return {
        ...this.returnDefaultResponse.ok,
        data: sale,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async destroy ({ response, params }: HttpContextContract): Promise<void | { message: string, error: string }> {

    const trx = await Database.transaction() // Iniciar uma transação

    try {
      // Busca a venda pelo id
      const getSales = await this.saleModel.query().where('id', params.id).andWhere('is_deleted', false).first();
      getSales?.useTransaction(trx)

      const getStock = await this.productModel.findBy('id', getSales?.product_id);
      getStock?.useTransaction(trx)

      // Verifica se a venda existe
      if (!getSales) {
        await trx.rollback()
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.saleNotFound.message,
        };
      }

      // Verifica se o produto existe
      if (!getStock) {
        await trx.rollback()
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.productNotFound.message,
        };
      }

      // Atualiza a venda para deletada
      getSales.is_deleted = true;
      await getSales.save()

      // Atualiza o estoque do produto
      getStock.stock += getSales?.quantity;
      await getStock.save()

      await trx.commit()

      response.status(204)

      return;
    } catch (error) {
      await trx.rollback()
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  } 
}
