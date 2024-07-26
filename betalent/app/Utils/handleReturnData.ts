import { CreateClientDTO } from 'App/DTO/Clients/CreateClientDTO';
import { ResponseCreateClientDTO, MainDataClientDTO } from 'App/DTO/Clients/ResponseClientDTO';
import { ResponseUserDTO } from 'App/DTO/Users/ResponseUserDTO';
import User from 'App/Models/User';

export const ReturnUserDataWithoutPassword = (user: User): ResponseUserDTO => {
  return {
    data:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toLocaleString(),
      updatedAt: user.updatedAt.toLocaleString(),
    }
  };
};

export const ReturnDataCLientStore = (id: number, data: CreateClientDTO): ResponseCreateClientDTO => {
  return {
    data:{
      id: id,
      nome: data.name,
      email: data.email,
      telefone: data.phone,
      cpf: data.cpf,
      cadastro_data: new Date().toLocaleString(),
      ultima_att: new Date().toLocaleString(),
      endereco: {
        endereco_id: data.address.id,
        rua: data.address.street,
        numero: data.address.number,
        cep: data.address.zip_code,
        bairro: data.address.neighborhood,
        cidade: data.address.city,
        estado: data.address.state,
      }
    }
  };
}

export const ReturnDataClientIndex = (data: MainDataClientDTO[] ) => {
  const response = data.map((client) => {
    return {
      id: client.id,
      nome: client.name,
      email: client.email,
      telefone: client.number,
      cpf: client.cpf,
      cadastro_data: new Date(client.created_at).toLocaleString(),
      ultima_att: new Date(client.updated_at).toLocaleString(),
    }
  })

  return response;
}
