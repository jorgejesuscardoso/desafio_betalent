// app/Middleware/Auth.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DefaultMsg } from 'App/Utils/defaultMsg'

export default class LoginMiddleware {

  constructor(
    private userModel = User,
    private defaultMsg = DefaultMsg
  ) {}

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {

      // Verifica se o email e a senha foram enviados
      const { email, password } = request.only(['email', 'password'])
      if (!email || !password) {
        return response.badRequest(this.defaultMsg.invalidData)
      }
      
      // Verifica se o usuário existe
      const user = await this.userModel.findBy('email', email)
      if (!user) {
        return response.badRequest(this.defaultMsg.userNotFound)
      }      

      await next()
    } catch (error) {
      return response.internalServerError({...this.defaultMsg.serverError, error})
    }
  }
}
