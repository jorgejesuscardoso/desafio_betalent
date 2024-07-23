// app/Middleware/Auth.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'

export default class Auth {

  constructor(
    private userModel = User,
    private returnDefaultMsg = ReturnDefaultMsg
  ) {}

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {

      // Verifica se o email e a senha foram enviados
      const { email, password } = request.only(['email', 'password'])
      if (!email || !password) {
        return response.badRequest(this.returnDefaultMsg.badRequest)
      }
      
      // Verifica se o usuário existe
      const user = await this.userModel.findBy('email', email)
      if (!user) {
        return response.badRequest(this.returnDefaultMsg.badRequest)
      }      

      await next()
    } catch (error) {
      return response.internalServerError({...this.returnDefaultMsg.internalServerError, error})
    }
  }
}
