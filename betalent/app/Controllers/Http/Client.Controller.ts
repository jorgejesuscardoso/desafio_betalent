import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Client from 'App/Models/Client';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';
import { ValidateCPF, ValidateEmail, ValidatePhone } from 'App/Utils/Validator';

export default class UserClient {
  constructor(
    private clientModel = Client,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private validateCPF = ValidateCPF, 
    private returnDefaultMsg = ReturnDefaultMsg,
  ) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['email', 'phone', 'cpf', 'name']);

      const { email, phone, cpf, name } = data;

      if (!email || !phone || !cpf || !name) {
        return response.status(400).json(this.returnDefaultMsg.badRequest);
      }
      if (!this.validateEmail(email)) {
        return response.status(400).json(this.returnDefaultMsg.invalidEmail);
      }

      if (!this.validatePhone(phone)) {
        return response.status(400).json(this.returnDefaultMsg.invalidPhone);
      }

      if (!this.validateCPF(cpf)) {
        return response.status(400).json(this.returnDefaultMsg.invalidCPF);
      }

      const client = await this.clientModel.create(data);

      return response.status(201).json({
        ...this.returnDefaultMsg.created,
        data: client,
      });

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err
      });
    }
  }
}