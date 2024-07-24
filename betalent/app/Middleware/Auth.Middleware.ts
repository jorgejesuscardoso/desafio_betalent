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
      const token = request.headers().authorization;
      const removeBearer = token?.split(' ')[1];

      if (!token) {
        return response.status(401).json(this.returnDefaultMsg.tokenNotFound);
      } else if (!this.tokenVerify(String(removeBearer))) {
        return response.status(401).json(this.returnDefaultMsg.invalidToken);
      }

      await next()

    } catch (error) {
      return response.internalServerError({ ...this.returnDefaultMsg.internalServerError, error })
    }
  }
};