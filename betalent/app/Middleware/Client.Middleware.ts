export default class ClientsMiddleware {
  constructor() {}

  async handle({ request, response }, next) {
    try {
      const { email, phone, cpf, name } = request.only(['email', 'phone', 'cpf', 'name']);

      if (!email || !phone || !cpf || !name) {
        return response.status(400).json({ message: 'Email, phone, cpf and name are required' });
      }

      await next();
    } catch (error) {
      return response.internalServerError({ message: 'Internal server error', error });
    }
  }
}