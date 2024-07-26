export interface ResponseCreateClientDTO {
  data:{
    id: number,
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    cadastro_data: string,
    ultima_att: string,
    endereco: {
      endereco_id: number,
      rua: string,
      numero: string,
      cep: string,
      bairro: string,
      cidade: string,
      estado: string,
    }
  }
}

export interface ResponseShowClientDTO {
  data: {id: number,
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    cadastro_data: string,
    updated_at: string
    },
    address: {
      id: number,
      street: string,
      number: string,
      zip_code: string,
      neighborhood: string,
      city: string,
      state: string,
    },
  
}

export interface MainDataClientDTO {
  id: number,
  name: string,
  email: string,
  number: string,
  cpf: string,
  created_at: string,
  updated_at: string,
}

