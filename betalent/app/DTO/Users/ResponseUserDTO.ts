export interface ResponseUserDTO {
  data: {
    id: number
    name: string
    email: string
    photo: string
    role: string
    createdAt: string
    updatedAt: string,
 },
}

export interface ResponseUserAllDTO {
  data: {
    id: number
    name: string
    email: string
    photo: string
    role: string
    createdAt: string
    updatedAt: string,
 }[]
}

export interface ErrorResponseUserDTO {
  error: any
}