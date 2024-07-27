import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';
import { FormatDataUserToReturn } from 'App/Utils/handleFormatDataToReturn';
import { UserDTO, UserIndexDTO } from 'App/DTO/UserDTO';

export default class UserController {

  constructor(
    private userModel = User,
    private hashService = Hash,
    private formatDataUserToReturn = FormatDataUserToReturn,
    private returnDefaultMsg = ReturnDefaultMsg
  ) {  }

  public async store({ request, response }: HttpContextContract): Promise<void |UserDTO> {
    try {
     let { name, email, password, role } = request.body();     
   
      // Criptografa a senha e cria um novo usuário
      const hashed = await this.hashService.make(password)  
      const user = await this.userModel.create({
        name,
        email,
        role,
        password: hashed,
      })
  
      const data = this.formatDataUserToReturn(user);

      response.status(201)
      return data;  

    } catch (error) {
     return response.status(500).json({
      ...this.returnDefaultMsg.serverError,
      error: error.message,
     })
    }   
  }

  public async index({ response }: HttpContextContract): Promise<void | UserIndexDTO> {
    try {
      
      const user = await this.userModel.all()

      // Ordena os usuários pelo ID
      user.sort((a, b) => a.id - b.id)

      // Oculta a senha dos usuários
      const data = user.map((user) => {
        const passRemoving = this.formatDataUserToReturn(user).data;
        return passRemoving;
      })

      response.status(200)

      return { data };      
      
    } catch (error) {
      response.status(500).json({
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      })
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<void | UserDTO> {
    try {

      // Busca um usuário pelo ID
      const user = await this.userModel.find(params.id)
      response.status(200)

      if(!user) return response.status(404).json(this.returnDefaultMsg.userNotFound);
        

      //  Oculta a senha do usuário
      const data = this.formatDataUserToReturn(user).data;

      response.status(200)
      return {
        data
      }

    } catch (error) {
      response.status(500).json({
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void | UserDTO> {
    try {

      let { email, name, password, role } = request.body();

      // Verifica se o usuário é válido
      const user = await this.userModel.findBy('id', +params.id);
      if(!user) return  response.status(404).json(this.returnDefaultMsg.userNotFound);   

      if (password) {
       password = await this.hashService.make(password)
      };

      // Atualiza outros campos do usuário
      user.merge({
        name,
        email,
        password,
        role,
      })

      await user.save()

      const data = this.formatDataUserToReturn(user).data;

      response.status(200);

      return {
        data
      }

    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    try {
      const user = await this.userModel.findOrFail(+params.id)
      await user.delete()

      response.status(204)

      return;
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultMsg.serverError,
        error: error.message,
      })
    }
  }
}
