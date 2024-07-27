import Client from 'App/Models/Client'
import { ReturnDefaultMsg } from './ReturnDefaultMsg'
import Phone from 'App/Models/Phone'

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

  const phoneSplited = phone.split(' ').join('').split('-').join('')
  if(phoneSplited.length < 11) return false
  return regexPhone.test(phoneSplited)
}

export const ValidateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');

    if (+cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

export const CheckDuplicateClientEntry = async ({ clientId, email, phone, cpf}): Promise< { success: boolean, message: string }> => {

  // Verifica se já existe um cliente com o email, telefone ou cpf
  const clientEmail = email ? await Client.query()
  .where('email', email)
  .whereNot('id', clientId) // Não considerar o próprio cliente
  .first() : null

  const clientPhone = phone ? await Phone.query()
  .where('number', phone)
  .whereNot('client_id', clientId) // Não considerar o próprio cliente
  .first() : null

  const clientCpf = cpf ? await Client.query()
  .where('cpf', cpf)
  .whereNot('id', clientId) // Não considerar o próprio cliente
  .first() : null

  // Resposta detalhada com base no campo já existente
  if (clientEmail || clientPhone || clientCpf) {
    const message = clientEmail
    ? ReturnDefaultMsg.conflictEmail.message
    : clientPhone
    ? ReturnDefaultMsg.conflictPhone.message
    : clientCpf
    ? ReturnDefaultMsg.conflictCPF.message
    : '';

    return {
    success: false,
    message,
    };
  }

  return {
    success: true,
    message: '',
  };
};