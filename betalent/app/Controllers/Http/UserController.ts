import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { ReturnDefaultMsg } from 'App/utils/ReturnDefaultMsg'
import { CreateUserDTO } from 'App/DTO/Users/CreateUserDTO'
import { ErrorResponseUserDTO, ResponseUserAllDTO, ResponseUserDTO } from 'App/DTO/Users/ResponseUserDTO'
import { HandleSaveAndGiveNameToImage } from 'App/utils/ImageProcessing'

export default class UserController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }  

  public async index({ response }: HttpContextContract): Promise<ResponseUserAllDTO | ErrorResponseUserDTO> {
    try {
      
      const user = await User.all()

      // Ordena os usuários pelo ID
      user.sort((a, b) => a.id - b.id)

      // Oculta a senha dos usuários
      const hiddenPassword = user.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          role: user.role,
          createdAt: user.createdAt.toLocaleString(),
          updatedAt: user.updatedAt.toLocaleString(),
        }
      })

      // Retorna os usuários
      response.status(200)
      return {
        data: hiddenPassword,
      }
      
    } catch (error) {
      response.status(500)

      return {
        ...ReturnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<ResponseUserDTO | ErrorResponseUserDTO> {
    try {

      // Busca um usuário pelo ID
      const user = await User.findOrFail(params.id)
      response.status(200)

      //  Oculta a senha do usuário
      const hiddenPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        createdAt: user.createdAt.toLocaleString(),
        updatedAt: user.updatedAt.toLocaleString(),
      }

      // Retorna o usuário encontrado
      return {
        data: hiddenPassword,
      }

    } catch (error) {
      response.status(500)
      return {
        ...ReturnDefaultMsg.internalServerError,
        error: error.message,
      }
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<ResponseUserDTO | ErrorResponseUserDTO> {
   try {

    // Extrai os campos obrigatórios do corpo da requisição
    let { email, name, password, role } = request.body() as CreateUserDTO
    const user = await User.findOrFail(params.id)

    // Verifica se o campo de foto foi enviado e salva a foto
    const hasPhoto = request.file('photo', this.validationOptions)
    if (hasPhoto) {
      const photoProcess = await HandleSaveAndGiveNameToImage(hasPhoto)
      if(!photoProcess) throw new Error(ReturnDefaultMsg.imageError.message)
      user.photo = photoProcess
    }
    
    // Verifica se o campo de senha foi enviado e criptografa a senha 
    if (password) {
      password = await Hash.make(password)
    }
  
    // Atualiza outros campos do usuário
    user.merge({
      name,
      email,
      password,
      role,
    })
  
    // Salva as alterações
    await user.save()
  
    response.status(200)

    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      createdAt: user.createdAt.toLocaleString(),
      updatedAt: user.updatedAt.toLocaleString(),
    }
  
    return {
      ...ReturnDefaultMsg.updated,
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
      const user = await User.findOrFail(+params.id)
      await user.delete()

      response.status(204)

      return { 
        ...ReturnDefaultMsg.deleted,
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
