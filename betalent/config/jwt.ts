// config/auth.ts
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

type DataToToken ={
  id: number
  email: string
}

export  const CreateToken = (data: DataToToken) => {
  const token = jwt.sign(data, Env.get('SECRET'), {
    expiresIn: Env.get('EXPIRES_IN')
  })

  return token
}
