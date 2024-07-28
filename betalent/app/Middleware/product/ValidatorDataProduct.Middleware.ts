import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { DefaultMsg } from 'App/Utils/defaultMsg'

export default class ValidatorDataCreateProduct {

  constructor(
    private productModel = Product,
    private defaultMsg = DefaultMsg,
  ) {  }  

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {    
    try {

      const { name, description, price, stock, brand } = request.body()

      if(!name || !description || price < 0 || stock < 0 || !brand) return response.badRequest(this.defaultMsg.invalidData)

      const validator =
      name.length < 3 ? this.defaultMsg.invalidProductName
      : description.length < 10 ? this.defaultMsg.invalidProductDescription
      : brand.length < 3 ? this.defaultMsg.invalidBrand
      : stock < 1 ? this.defaultMsg.invalidStock
      : price < 1 ? this.defaultMsg.invalidPrice
      : null
      
      if(validator) return response.badRequest(validator)

      const alreadyExist= await this.productModel.findBy('name', name)
      if(alreadyExist) return response.badRequest(this.defaultMsg.productAlreadyExist)

      await next()  
    } catch (error) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  }
}
