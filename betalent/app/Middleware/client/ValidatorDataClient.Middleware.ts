import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg';
import { CheckDuplicateClientEntry, ValidateCPF, ValidateEmail, ValidatePhone } from 'App/Utils/Validator';

export default class ClientsMiddleware {
  constructor(
    private returnDefaultMsg = ReturnDefaultMsg,
    private validateCpf = ValidateCPF,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private checkDuplicateEntry = CheckDuplicateClientEntry,
  ) {}

  async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { email, phone, cpf, name } = request.only(['email', 'phone', 'cpf', 'name']);

      if (!email || !phone || !cpf || !name) {
        return response.status(400).json(this.returnDefaultMsg.invalidData);
      }     

      // Valida os campos com regex
      if (!this.validateEmail(email)) {
        return response.status(400).json(this.returnDefaultMsg.invalidEmailFormat);
      } else if (!this.validatePhone(phone)) {
        return response.status(400).json(this.returnDefaultMsg.invalidClientPhone);
      } else if (!this.validateCpf(cpf)) {
        return response.status(400).json(this.returnDefaultMsg.invalidClientCpf);
      }

      const checkData = await this.checkDuplicateEntry({ clientId: null, email, phone, cpf });
      if(!checkData.success) return response.badRequest(checkData); 

      await next();

    } catch (error) {
      return response.status(500).json({ message: 'Internal server error', error });
    }
  }
}