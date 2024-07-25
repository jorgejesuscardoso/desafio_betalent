import Client from 'App/Models/Client';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';
import { ValidateCPF, ValidateEmail, ValidatePhone } from 'App/Utils/Validator';

export default class ClientsMiddleware {
  constructor(
    private returnDefaultMsg = ReturnDefaultMsg,
    private validateCpf = ValidateCPF,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private client = Client
  ) {}

  async handle({ request, response }, next) {
    try {
      const { email, phone, cpf, name } = request.only(['email', 'phone', 'cpf', 'name']);

      if (!email || !phone || !cpf || !name) {
        return response.status(400).json(this.returnDefaultMsg.invalidFields);
      }

      const clientEmail = await this.client.findBy('email', email);
      const clientPhone = await this.client.findBy('phone', phone);
      const clientCpf = await this.client.findBy('cpf', cpf);

      if (clientEmail || clientPhone || clientCpf) {
        return response.status(400).json(this.returnDefaultMsg.clientAlreadyExists);
      } else

      if (!this.validateEmail(email)) {
        return response.status(400).json(this.returnDefaultMsg.invalidEmail);
      } else if (!this.validatePhone(phone)) {
        return response.status(400).json(this.returnDefaultMsg.invalidPhone);
      } else if (!this.validateCpf(cpf)) {
        return response.status(400).json(this.returnDefaultMsg.invalidCPF);
      }

      await next();
    } catch (error) {
      return response.internalServerError({ message: 'Internal server error', error });
    }
  }
}