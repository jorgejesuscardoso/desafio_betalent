// app/Middleware/Auth.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ReturnDefaultMsg } from 'App/utils/ReturnDefaultMsg'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {

      // Verifica se o email e a senha foram enviados
      const { email, password } = request.only(['email', 'password'])
      if (!email || !password) {
        return response.badRequest(ReturnDefaultMsg.badRequest)
      }
      
      // Verifica se o usuário existe
      const user = await User.findBy('email', email)
      if (!user) {
        return response.badRequest(ReturnDefaultMsg.badRequest)
      }      

      await next()
    } catch (error) {
      return response.internalServerError({...ReturnDefaultMsg.internalServerError, error})
    }
  }
}
