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
  ) {  }

  public async handle({request, response, params}: HttpContextContract, next: () => Promise<void>) {
    try {

      const { email, phone, cpf } = request.body()

      // Verifica se já existe um cliente com o email, telefone ou cpf
      const checkData = await this.checkDuplicateEntry(email, phone, cpf);
      if(!checkData.success) return response.badRequest(checkData);

      // Verifica se o usuário existe
      const isClient = await this.clientModel.findBy('id', params.id);
      if(!isClient) return response.notFound(this.returnDefaultMsg.clientNotFound);

      // Valida o email e a senha com regex se eles existirem no corpo da requisição
      if(email && !this.validateEmail(email)) return response.badRequest(this.returnDefaultMsg.invalidEmail);
      
      // Verifica se o telefone é válido
      if(phone && !this.validatePhone(request.body().phone)) return response.badRequest(this.returnDefaultMsg.invalidPhone);

      // Verifica se o cpf é válido
      if(cpf && !this.validateCPF(request.body().cpf)) return response.badRequest(this.returnDefaultMsg.invalidCPF);

      await next()

    } catch (error) {
      response.status(500)

      return {
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }
}
