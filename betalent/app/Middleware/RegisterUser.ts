import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ValidateEmail, ValidatePassword } from 'App/utils/Regex'
import { ReturnDefaultMsg } from 'App/utils/ReturnDefaultMsg'

export default class Register {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      
      // Extrai os campos obrigatórios do corpo da requisição
      const { name, email, password, role } = request.only(['name', 'email', 'password', 'role'])

      // Verifica se todos os campos obrigatórios estão presentes
      if (!name || !email || !password || !role) {
        return response.badRequest(ReturnDefaultMsg.badRequest)
      }

      // Verifica se já existe um usuário com o mesmo e-mail
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.badRequest({
          ...ReturnDefaultMsg.conflictEmail
        })
      }

      // Valida o formato do e-mail usando Regex
      if (!ValidateEmail(email)) {
        return response.badRequest({
          ...ReturnDefaultMsg.invalidEmail
        })
      }

      // Valida a senha usando Regex
      if (!ValidatePassword(password)) {
        return response.badRequest({
          ...ReturnDefaultMsg.invalidPassword
        })
      }

    } catch (err) {
      return response.internalServerError({
        ...ReturnDefaultMsg.internalServerError,
        details: err.message
      })
    }

    await next()
  }
}
