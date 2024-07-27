import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg'
import { ValidateEmail, ValidatePasswordForm } from 'App/Utils/Validator'

export default class UserUpdateMiddleware {

  constructor(
    private userModel = User,
    private returnDefaultMsg = ReturnDefaultMsg,
    private validateEmail = ValidateEmail,
    private validatePasswordForm = ValidatePasswordForm
  ) {  }

  public async handle({request, response, params}: HttpContextContract, next: () => Promise<void>) {
    try {

      const { email, password } = request.body()

      // Verifica se o usuário existe
      const user = await this.userModel.findBy('id', +params.id)
      if(!user) return response.badRequest(this.returnDefaultMsg.userNotFound)

      // Valida o tamanho da senha se ela existir no corpo da requisição
      if(password && password.length < 6) return response.badRequest(this.returnDefaultMsg.invalidPasswordLength)

      // Valida o email e a senha com regex se eles existirem no corpo da requisição
      if(email && !this.validateEmail(email)) return response.badRequest(this.returnDefaultMsg.invalidEmailFormat)
        
      if(password && !this.validatePasswordForm(password)) return response.badRequest(this.returnDefaultMsg.invalidEmailFormat)
      
      await next()

    } catch (error) {
      response.status(500)

      return {
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      }
    }
  }
}
