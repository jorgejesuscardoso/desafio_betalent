import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg'
import { CreateUserDTO } from 'App/DTO/Users/CreateUserDTO'
import { ErrorResponseUserDTO, ResponseUserAllDTO, ResponseUserDTO } from 'App/DTO/Users/ResponseUserDTO'
import { HandleSaveAndGiveNameToImage } from 'App/Utils/ImageUpload'
import { ValidateEmail, ValidatePasswordForm, ValidatePhone } from 'App/Utils/Validator'

export default class UserController {
  
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  constructor(
    private userModel = User,
    private hashService = Hash,
    private handleImage = HandleSaveAndGiveNameToImage,
    private validateEmail = ValidateEmail,
    private validatePasswordForm = ValidatePasswordForm,
    private validatePhone = ValidatePhone,
    private returnDefaultMsg = ReturnDefaultMsg
  ) {  }

  public async store({ request, response }: HttpContextContract) {
    try {
     let { name, photo, email, password, role, phone } = request.body() as CreateUserDTO
        
      // Verifica se os campos obrigatórios foram enviados
      if(!role || !email || !password || !name) return response.badRequest(this.returnDefaultMsg.badRequest)

      // Verifica se o email já está cadastrado
      if(await this.userModel.findBy('email', email)) return response.badRequest(this.returnDefaultMsg.conflictEmail)

      // Valida o tamanho da senha e telefone
      if(password.length < 6) return response.badRequest(this.returnDefaultMsg.invalidPasswordLength)
      if(phone && !this.validatePhone(phone)) return response.badRequest(this.returnDefaultMsg.invalidPhone)

      // Valida o email e a senha com regex
      if(!this.validateEmail(email)) return response.badRequest(this.returnDefaultMsg.invalidEmail)      
      if(!this.validatePasswordForm(password)) return response.badRequest(this.returnDefaultMsg.invalidPassword)
 
      // Valida o tamanho da imagem
      const validatePhoto = request.file('photo', this.validationOptions)
 
      if (validatePhoto && validatePhoto.size > 2097152) {
        return response.badRequest(this.returnDefaultMsg.imageErrorSize)
      }
      // Processa a imagem e salva no diretório de uploads
      if(validatePhoto) {
        const photoName = await this.handleImage(validatePhoto)      
        if(!photoName) return response.badRequest(this.returnDefaultMsg.badRequest)
        photo = photoName
      }
  
      // Criptografa a senha
      const hashed = await this.hashService.make(password)
  
      // Cria o usuário
      const user = await this.userModel.create({name, email, photo, role, password: hashed})
  
      response.status(201) 
      return {
        ...this.returnDefaultMsg.created,
        data: user,
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
      const hidderPassword = user.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: user.photo,
          role: user.role,
          createdAt: user.createdAt.toLocaleString(),
          updatedAt: user.updatedAt.toLocaleString(),
        }
      })

      // Retorna os usuários
      response.status(200)
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
      const hidderPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        role: user.role,
        createdAt: user.createdAt.toLocaleString(),
        updatedAt: user.updatedAt.toLocaleString(),
      }

      // Retorna o usuário encontrado
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

    // Extrai os campos obrigatórios do corpo da requisição
    let { email, name, password, role, phone, photo } = request.body() as CreateUserDTO

    // Verifica se o usuário é válido
    const user = await this.userModel.findOrFail(params.id)
    if(!user) return {...this.returnDefaultMsg.notFound, error: this.returnDefaultMsg.userNotFound.message}

    // Verifica se o campo de foto foi enviado e salva a foto
    const hasPhoto = photo && request.file(photo, this.validationOptions)
    if (photo && hasPhoto) {
      const photoProcess = await this.handleImage(hasPhoto)
      if(!photoProcess) throw new Error(this.returnDefaultMsg.imageError.message)
        
      user.photo = photoProcess
    }
    
    // Verifica se o campo de senha foi enviado e criptografa a senha 
    if (password) {
      password = await this.hashService.make(password)
    }
  
    // Atualiza outros campos do usuário
    user.merge({
      name,
      email,
      password,
      phone,
      role,
    })
  
    // Salva as alterações
    await user.save()
  
    response.status(200)

    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      role: user.role,
      createdAt: user.createdAt.toLocaleString(),
      updatedAt: user.updatedAt.toLocaleString(),
    }
  
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
