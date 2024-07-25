import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TokenVerify } from 'App/Utils/JWT';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';

export default class AuthMiddleware {
  constructor(
    private tokenVerify = TokenVerify,
    private returnDefaultMsg = ReturnDefaultMsg,
  ) {}

  async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {    
    try {
      // Obtém o token do cabeçalho da requisição
      const token = request.headers().authorization;
      const removeBearer = token?.split(' ')[1];

      // Verifica se o token é válido e retorna uma mensagem de erro caso não seja
      const isValidToken = this.tokenVerify(String(removeBearer));
      if (!token && !isValidToken) return response.status(401).json(this.returnDefaultMsg.unauthorized);

      await next()

    } catch (error) {
      return response.internalServerError({ ...this.returnDefaultMsg.internalServerError, error })
    }
  }
};