import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DefaultMsg } from 'App/Utils/defaultMsg'
import { ValidateEmail, ValidatePasswordForm } from 'App/Utils/validator'

export default class UserMiddleware {

  constructor(
    private userModel = User,
    private defaultMsg = DefaultMsg,
    private validateEmail = ValidateEmail,
    private validatePasswordForm = ValidatePasswordForm
  ) {  }

  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    try {

      const { role, email, password, name } = request.only(['role', 'email', 'password', 'name'])

      // Verifica se os campos obrigatórios foram enviados
      if(!role || !email || !password || !name) return response.badRequest(this.defaultMsg.invalidData)

      // Verifica se o email já está cadastrado
      if(await this.userModel.findBy('email', email)) return response.conflict(this.defaultMsg.emailAlreadyExist)

      // Valida o tamanho da senha e telefone
      if(password.length < 6) return response.badRequest(this.defaultMsg.invalidPasswordLength)

      // Valida o email e a senha com regex
      if(!this.validateEmail(email)) return response.badRequest(this.defaultMsg.invalidEmailFormat)

      if(!this.validatePasswordForm(password)) return response.badRequest(this.defaultMsg.invalidPasswordFormat)
      
      await next()

    } catch (error) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  }
}
