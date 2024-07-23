import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export const HandleSaveAndGiveNameToImage = async (request) => {
  try {
    if (request) {
      const photoName = `${uuidv4()}.${request.extname}`

      await request.move(Application.tmpPath('uploads'), {
        name: photoName,
      })
  
      return photoName
    }
  } catch (error) {
    throw new Error(error.message)
  }
};