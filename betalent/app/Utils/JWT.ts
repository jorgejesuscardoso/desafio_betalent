// config/auth.ts
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

type DataToToken ={
  id: number
  email: string
}

export  const TokenGenerate = (data: DataToToken) => {
  const token = jwt.sign(data, Env.get('SECRET'), {
    expiresIn: Env.get('EXPIRES_IN')
  })

  return token
}

export const TokenVerify = (token: string) => {
  const data = jwt.verify(token, Env.get('SECRET'))
  
  return data
}
