import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'
import { CreateUserDTO } from 'App/DTO/Users/CreateUserDTO'
import { ErrorResponseUserDTO, ResponseUserAllDTO, ResponseUserDTO } from 'App/DTO/Users/ResponseUserDTO'
import { ReturnUserDataWithoutPassword } from 'App/Utils/handleReturnData'

export default class UserController {

  constructor(
    private userModel = User,
    private hashService = Hash,
    private returnUserData = ReturnUserDataWithoutPassword,
    private returnDefaultMsg = ReturnDefaultMsg
  ) {  }

  public async store({ request, response }: HttpContextContract): Promise<ResponseUserDTO | ErrorResponseUserDTO> {
    try {
     let { name, email, password, role } = request.body() as CreateUserDTO;     
   
      // Criptografa a senha
      const hashed = await this.hashService.make(password)
  
      const user = await this.userModel.create({name, email, role, password: hashed})
  
      response.status(201)
      const data = this.returnUserData(user).data;
      return {
        ...this.returnDefaultMsg.created,
        data
      } 

    } catch (error) {
     response.status(500)

     return {
       ...this.returnDefaultMsg.internalServerError,
       error: error.message,
     }
    }
   }

  public async index({ response }: HttpContextContract): Promise<ResponseUserAllDTO | ErrorResponseUserDTO> {
    try {
      
      const user = await this.userModel.all()

      // Ordena os usuários pelo ID
      user.sort((a, b) => a.id - b.id)

      // Oculta a senha dos usuários
      const hidderAllPassword = user.map((user) => {
        const data = this.returnUserData(user).data;
        return data;
      })

      response.status(200)

      return {
        data: hidderAllPassword,
      }
      
    } catch (error) {
      response.status(500)

      return {
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<ResponseUserDTO | ErrorResponseUserDTO> {
    try {

      // Busca um usuário pelo ID
      const user = await this.userModel.find(params.id)
      response.status(200)

      if(!user) {
        return {
          error: this.returnDefaultMsg.notFound.message,
          ...this.returnDefaultMsg.userNotFound,
        }
      }

      //  Oculta a senha do usuário
      const hidderPassword = this.returnUserData(user).data;

      return {
        data: hidderPassword,
      }

    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<ResponseUserDTO | ErrorResponseUserDTO> {
    try {

      let { email, name, password, role } = request.body() as CreateUserDTO

      // Verifica se o usuário é válido
      const user = await this.userModel.findOrFail(+params.id)
      if(!user) return {...this.returnDefaultMsg.notFound, error: this.returnDefaultMsg.userNotFound.message}    

      if (password) {
      password = await this.hashService.make(password)
      }

      // Atualiza outros campos do usuário
      user.merge({
      name,
      email,
      password,
      role,
      })

      await user.save()

      response.status(200)

      const responseData = this.returnUserData(user).data;

      return {
      ...this.returnDefaultMsg.updated,
      data: responseData,
      }
    } catch (error) {
      response.status(500)
      return {
      error: error.message,
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await this.userModel.findOrFail(+params.id)
      await user.delete()

      response.status(204)

      return { 
        ...this.returnDefaultMsg.deleted,
      }
    } catch (error) {
      response.status(500)

      return {
        ...this.returnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }
}
