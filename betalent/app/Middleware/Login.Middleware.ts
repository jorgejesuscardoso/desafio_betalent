// app/Middleware/Auth.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg'

export default class LoginMiddleware {

  constructor(
    private userModel = User,
    private returnDefaultMsg = ReturnDefaultMsg
  ) {}

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {

      // Verifica se o email e a senha foram enviados
      const { email, password } = request.only(['email', 'password'])
      if (!email || !password) {
        return response.badRequest(this.returnDefaultMsg.invalidData)
      }
      
      // Verifica se o usuário existe
      const user = await this.userModel.findBy('email', email)
      if (!user) {
        return response.badRequest(this.returnDefaultMsg.userNotFound)
      }      

      await next()
    } catch (error) {
      return response.internalServerError({...this.returnDefaultMsg.serverError, error})
    }
  }
}
