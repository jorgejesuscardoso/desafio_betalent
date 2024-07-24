import { ReturnDefaultMsg } from './ReturnDefaultMsg'

export const ValidateEmail = (email: string) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return regexEmail.test(email)
}

export const ValidatePasswordForm = (password: string) => {

  if(password.length < 6) return {...ReturnDefaultMsg.invalidPasswordLength}

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?/])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?/]{6,}$/;

  return regexPassword.test(password)
}

export const ValidatePhone = (phone: string) => {
  const regexPhone = /^(\d{2})\s?\d{4,5}-?\d{4}$/;


  return regexPhone.test(phone)
}