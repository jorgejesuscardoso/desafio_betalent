import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({ auth, response}: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.authenticate()
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
  }
}
