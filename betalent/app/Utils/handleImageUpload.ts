import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export const HandleSaveImage = async (request, productName) => {
  try {
    if (request) {

      const sanitizedProductName = productName.split(' ').join('-').toLowerCase()

      const name = sanitizedProductName.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos do nome do produto
      
      // Gera um nome único para a imagem
      const photoName = `${uuidv4()}.${name}.${request.extname}`

      // Salva a imagem na pasta tmp/thumbs
      await request.move(Application.publicPath('thumbs'), {
        name: photoName,
      })
  
      // Retorna o nome da imagem
      return {
       thumbName: photoName
      }
    }
  } catch (error) {
    throw new Error(error.message)
  }
};