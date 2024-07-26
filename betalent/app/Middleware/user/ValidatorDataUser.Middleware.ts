import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'
import { ValidateEmail, ValidatePasswordForm } from 'App/Utils/Validator'

export default class UserMiddleware {

  constructor(
    private userModel = User,
    private returnDefaultMsg = ReturnDefaultMsg,
    private validateEmail = ValidateEmail,
    private validatePasswordForm = ValidatePasswordForm
  ) {  }

  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    try {

      const { role, email, password, name } = request.body()

      // Verifica se os campos obrigatórios foram enviados
      if(!role || !email || !password || !name) return response.badRequest(this.returnDefaultMsg.badRequest)

      // Verifica se o email já está cadastrado
      if(await this.userModel.findBy('email', email)) return response.badRequest(this.returnDefaultMsg.conflictEmail)

      // Valida o tamanho da senha e telefone
      if(password.length < 6) return response.badRequest(this.returnDefaultMsg.invalidPasswordLength)

      // Valida o email e a senha com regex
      if(!this.validateEmail(email)) return response.badRequest(this.returnDefaultMsg.invalidEmail)

      if(!this.validatePasswordForm(password)) return response.badRequest(this.returnDefaultMsg.invalidPassword)
      
      await next()

    } catch (error) {
      console.error(error)
    }
  }
}
