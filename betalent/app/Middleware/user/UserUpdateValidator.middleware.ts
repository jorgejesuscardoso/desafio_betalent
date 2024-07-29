import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DefaultMsg } from 'App/Utils/defaultMsg'
import { ValidateEmail, ValidatePasswordForm } from 'App/Utils/validator'

export default class UserUpdateMiddleware {

  constructor(
    private userModel = User,
    private defaultMsg = DefaultMsg,
    private validateEmail = ValidateEmail,
    private validatePasswordForm = ValidatePasswordForm
  ) {  }

  public async handle({request, response, params}: HttpContextContract, next: () => Promise<void>) {
    try {

      const { email, password } = request.body()

      // Verifica se o usuário existe
      const user = await this.userModel.findBy('id', +params.id)
      if(!user) return response.badRequest(this.defaultMsg.userNotFound)

      // Valida o tamanho da senha se ela existir no corpo da requisição
      if(password && password.length < 6) return response.badRequest(this.defaultMsg.invalidPasswordLength)

      // Valida o email e a senha com regex se eles existirem no corpo da requisição
      if(email && !this.validateEmail(email)) return response.badRequest(this.defaultMsg.invalidEmailFormat)
        
      if(password && !this.validatePasswordForm(password)) return response.badRequest(this.defaultMsg.invalidEmailFormat)
      
      await next()

    } catch (error) {
      response.status(500)

      return {
        ...this.defaultMsg.serverError,
        error: error.message,
      }
    }
  }
}
