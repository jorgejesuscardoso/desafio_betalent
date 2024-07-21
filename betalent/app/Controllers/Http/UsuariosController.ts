import { v4 as uuidv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Application from '@ioc:Adonis/Core/Application'
import Hash from '@ioc:Adonis/Core/Hash'


export default class UsuariosController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const foto = request.file('foto', this.validationOptions)

    if(foto) {
      const fotoName = `${uuidv4()}.${foto.extname}`

      await foto.move(Application.tmpPath('uploads'), {
        name: fotoName,
      })

      body.foto = fotoName
    }

    const hashing = await Hash.make(body.senha)

    const usuario = await Usuario.create({...body, senha: hashing})

    response.status(201)

    return {
      mensagem: 'Usuário criado com sucesso',
      data: usuario,
    }
  }

  public async index({ response }: HttpContextContract) {
    const user = await Usuario.all()

    response.status(200)

    return {
      data: user,
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await Usuario.findOrFail(params.id)

    response.status(200)

    return {
      data: user,
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const user = await Usuario.findOrFail(params.id)
  
    if (body.foto) {
      const foto = request.file('foto', this.validationOptions)
      
      if (foto) {
        const fotoName = `${uuidv4()}.${foto.extname}`
        await foto.move(Application.tmpPath('uploads'), {
          name: fotoName,
        })
        user.foto = fotoName
      }
    }
  
    if (body.senha) {
      body.senha = await Hash.make(body.senha)
    }
  
    user.merge(body)
  
    await user.save()
  
    response.status(200)
  
    return {
      mensagem: 'Usuário atualizado com sucesso',
      data: user,
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await Usuario.findOrFail(params.id)

    await user.delete()

    response.status(204)

    return {
      mensagem: 'Usuário deletado com sucesso',
      data: user,
    }

  }
}
