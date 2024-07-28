import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DefaultMsg } from 'App/Utils/defaultMsg';
import { CheckDuplicateClientEntry, ValidateCPF, ValidateEmail, ValidatePhone } from 'App/Utils/validator';

export default class ClientsMiddleware {
  constructor(
    private defaultMsg = DefaultMsg,
    private validateCpf = ValidateCPF,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private checkDuplicateEntry = CheckDuplicateClientEntry,
  ) {}

  async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { email, phone, cpf, name } = request.only(['email', 'phone', 'cpf', 'name']);

      if (!email || !phone || !cpf || !name) {
        return response.status(400).json(this.defaultMsg.invalidData);
      }     

      // Valida os campos com regex
      if (!this.validateEmail(email)) {
        return response.status(400).json(this.defaultMsg.invalidEmailFormat);
      } else if (!this.validatePhone(phone)) {
        return response.status(400).json(this.defaultMsg.invalidClientPhone);
      } else if (!this.validateCpf(cpf)) {
        return response.status(400).json(this.defaultMsg.invalidClientCpf);
      }

      const checkData = await this.checkDuplicateEntry({ clientId: null, email, phone, cpf });
      if(!checkData.success) return response.badRequest(checkData); 

      await next();

    } catch (error) {
      return response.status(500).json({ message: 'Internal server error', error });
    }
  }
}