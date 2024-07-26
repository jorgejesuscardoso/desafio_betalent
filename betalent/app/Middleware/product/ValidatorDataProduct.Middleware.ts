import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'

export default class ValidatorDataCreateProduct {

  constructor(
    private productModel = Product,
    private returnDefaultMsg = ReturnDefaultMsg,
  ) {  }  

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {    
    try {

      const { name, description, price, stock, image, brand } = request.body()

      if(!name || !description || price < 0 || stock < 0 || !image || !brand) return response.badRequest(this.returnDefaultMsg.badRequest)

      const validator =
      name.length < 3 ? this.returnDefaultMsg.invalidProductName
      : description.length < 10 ? this.returnDefaultMsg.invalidProductDescription
      : brand.length < 3 ? this.returnDefaultMsg.invalidBrand
      : stock < 1 ? this.returnDefaultMsg.invalidStock
      : price < 1 ? this.returnDefaultMsg.invalidPrice
      : null
      
      if(validator) return response.badRequest(validator)

      const alreadyExist= await this.productModel.findBy('name', name)
      if(alreadyExist) return response.badRequest(this.returnDefaultMsg.productAlreadyExist)

      await next()  
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }
}
