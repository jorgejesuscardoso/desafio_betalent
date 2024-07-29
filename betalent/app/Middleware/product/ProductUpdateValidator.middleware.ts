import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { DefaultMsg } from 'App/Utils/defaultMsg'

export default class ValidatorUpdateDataCreateProduct {

  constructor(
    private productModel = Product,
    private defaultMsg = DefaultMsg,
  ) {  }  

  public async handle({ request, response, params }: HttpContextContract, next: () => Promise<void>) {
    
    try {
      const { name, description, price, stock, brand } = request.body()
      const productId = params.id

      const thumb = request.file('thumbnail')

      if (!name && !description && !price && !stock && !thumb && !brand) {
        return response.badRequest(this.defaultMsg.invalidData)
      }

      const validator =
        (name && name.length < 3) ? this.defaultMsg.invalidProductName
        : (description && description.length < 10) ? this.defaultMsg.invalidProductDescription
        : (brand && brand.length < 3) ? this.defaultMsg.invalidBrand
        : (stock !== null && stock < 1) ? this.defaultMsg.invalidStock
        : (price !== null && price < 1) ? this.defaultMsg.invalidPrice
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
          return response.badRequest(this.defaultMsg.productAlreadyExist)
        }
      }

      await next()
    } catch (error) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  }
}
