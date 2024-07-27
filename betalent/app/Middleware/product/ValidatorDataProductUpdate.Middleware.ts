import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg'

export default class ValidatorUpdateDataCreateProduct {

  constructor(
    private productModel = Product,
    private returnDefaultMsg = ReturnDefaultMsg,
  ) {  }  

  public async handle({ request, response, params }: HttpContextContract, next: () => Promise<void>) {
    
    try {
      const { name, description, price, stock, image, brand } = request.body()
      const productId = params.id

      if (!name && !description && !price && !stock && !image && !brand) {
        return response.badRequest(this.returnDefaultMsg.invalidData)
      }

      const validator =
        (name && name.length < 3) ? this.returnDefaultMsg.invalidProductName
        : (description && description.length < 10) ? this.returnDefaultMsg.invalidProductDescription
        : (brand && brand.length < 3) ? this.returnDefaultMsg.invalidBrand
        : (stock !== null && stock < 1) ? this.returnDefaultMsg.invalidStock
        : (price !== null && price < 1) ? this.returnDefaultMsg.invalidPrice
        : null

      if (validator) {
        return response.badRequest(validator)
      }

      // Verifica se o nome fornecido já existe para outro produto
      if (name) {
        const existingProduct = await this.productModel.query()
          .where('name', name)
          .whereNot('id', productId) // Não considerar o próprio produto sendo atualizado
          .first()
        
        if (existingProduct) {
          return response.badRequest(this.returnDefaultMsg.productAlreadyExist)
        }
      }

      await next()
    } catch (error) {
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      })
    }
  }
}
