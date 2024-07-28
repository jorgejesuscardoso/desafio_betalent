import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { DefaultMsg } from 'App/Utils/defaultMsg'
import { TokenGenerate } from 'App/Utils/JWT'

export default class AuthController {

  constructor(
    private tokenGenerate = TokenGenerate,
    private defaultMsg = DefaultMsg,
    private userModel = User,
    private hash = Hash
  ) {}

  public async login({ request, response }: HttpContextContract): Promise<{ token: string } | void> {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await this.userModel.findByOrFail('email', email)

      // Verifica se a senha informada é válida
      const validPassword = await this.hash.verify(user.password, password)

      if (validPassword) {
        const token = await this.tokenGenerate({ email: user.email, id: user.id })
        return response.ok({ token })
      }

      return response.badRequest(this.defaultMsg.invalidData)
    } catch (err) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      })
    }
  }
}
