import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'
import { ValidateCPF, ValidateEmail, ValidatePhone, CheckDuplicateClientEntry } from 'App/Utils/Validator'

export default class ClientUpdateMiddleware {

  constructor(
    private clientModel = Client,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private validateCPF = ValidateCPF,
    private checkDuplicateEntry = CheckDuplicateClientEntry,
    private returnDefaultMsg = ReturnDefaultMsg,
  ) { }

  public async handle({ request, response, params }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { email, phone, cpf } = request.body()
      const clientId = +params.id

      // Verifica se o cliente existe
      const isClient = await this.clientModel.find(clientId)
      if (!isClient) {
        return response.notFound(this.returnDefaultMsg.clientNotFound)
      }

      // Verifica se há campos para validar e valida o email, telefone e CPF se fornecidos
      const checkData = await this.checkDuplicateEntry({ clientId, email, phone, cpf})
      if (!checkData.success) return response.badRequest(checkData)

      if (email && !this.validateEmail(email)) return response.badRequest(this.returnDefaultMsg.invalidEmail)
      if (phone && !this.validatePhone(phone)) return response.badRequest(this.returnDefaultMsg.invalidPhone)
      if (cpf && !this.validateCPF(cpf)) return response.badRequest(this.returnDefaultMsg.invalidCPF)

      await next()
    } catch (error) {
      response.status(500)
      return response.json({
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      })
    }
  }
}
