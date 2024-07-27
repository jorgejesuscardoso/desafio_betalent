import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Product from 'App/Models/Product'
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg'

export default class ValidatorCreateSale {

  constructor(
    private returnDefaultResponse = ReturnDefaultMsg,
    private clientModel = Client,
    private productModel = Product,
  ) {}
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { client_id, product_id, quantity } = request.only(['client_id', 'product_id', 'quantity', 'unity_price']);

      if (!client_id || !product_id || !quantity ) return response.status(400).json(this.returnDefaultResponse.invalidData);
      
      // Verificar se o cliente existe
      const client = await this.clientModel.findBy('id', +client_id)
      // Verificar se o produto existe
      const product = await this.productModel.findBy('id', +product_id)

      const ValidateInput = !client
      ? this.returnDefaultResponse.clientNotFound
      : !product
      ? this.returnDefaultResponse.productNotFound
      : quantity <= 0
      ? this.returnDefaultResponse.quantityInvalid
      : quantity > product.stock
      ? {error: this.returnDefaultResponse.insufficientStock.message, message: this.returnDefaultResponse.stockAvailable.message + product.stock + ' units'}
      : null

      if (ValidateInput) return response.status(400).json(ValidateInput);

      await next()
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.errorCreatingSale,
        error: error.message
      })
    }
  }
}
