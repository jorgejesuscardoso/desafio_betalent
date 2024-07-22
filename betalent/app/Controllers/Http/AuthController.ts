import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { CreateToken } from 'Config/jwt'
import { ReturnDefaultMsg } from 'App/utils/ReturnDefaultMsg'
import { CreateUserDTO } from 'App/DTO/Users/CreateUserDTO'
import { HandleSaveAndGiveNameToImage } from 'App/utils/ImageProcessing'



export default class AuthController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async login({request, response}: HttpContextContract): Promise<void> {

    try {
      
      // Verifica se já existe um usuário com o email informado
      const { email, password } = request.only(['email', 'password'])
      const isUser = await User.findByOrFail('email', email)

      // Verifica se a senha informada é válida
      const validPassword = isUser ? await Hash.verify(isUser.password, password) : false

      // Se o usuário existe e a senha é válida, gera um token
      if (isUser && validPassword) {
        const token = await CreateToken({ email: email, id: isUser.id })
        return response.ok({ token })
      }

      // Se houver algum erro, retorna um erro 400
      return response.badRequest(ReturnDefaultMsg.badRequest)
    } catch(err) {
      return response.internalServerError({
        ...ReturnDefaultMsg.internalServerError,
        err,
      })
    }
  }

  public async register({ request, response }: HttpContextContract) {
    try {
     let { name, photo, email, password, role } = request.body() as CreateUserDTO
 
     // Valida o tamanho e o tipo da imagem
     const validatePhoto = request.file('photo', this.validationOptions)
 
     // Processa a imagem e salva no diretório de uploads
     if(validatePhoto) {
       const photoName = await HandleSaveAndGiveNameToImage(validatePhoto)      
       if(!photoName) return response.badRequest(ReturnDefaultMsg.badRequest)
       photo = photoName
     }
 
     // Criptografa a senha
     const hashing = await Hash.make(password)
 
     // Cria o usuário
     const user = await User.create({name, email, photo, role, password: hashing})
 
     response.status(201) 
     return {
       ...ReturnDefaultMsg.created,
       data: user,
     } 
    } catch (error) {
     response.status(500)
 
     return {
       ...ReturnDefaultMsg.internalServerError,
       error: error.message,
     }
    }
   }
}
