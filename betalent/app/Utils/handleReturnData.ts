import { CreateClientDTO } from 'App/DTO/Clients/CreateClientDTO';
import { ResponseCreateClientDTO, MainDataClientDTO } from 'App/DTO/Clients/ResponseClientDTO';
import { CreateProductDTO } from 'App/DTO/product/CreateProductDTO';
import { ResponseProductDTO } from 'App/DTO/product/ResponseProduct';
import { ResponseUserDTO } from 'App/DTO/Users/ResponseUserDTO';
import User from 'App/Models/User';

// USUÁRIOS
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


// CLIENTES
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

// PRODUTOS
export const ReturnDataProductStore = (id: number, data: CreateProductDTO) => {
  return {
    data:{
      id: id,
      nome: data.name,
      descricao: data.description,
      preço: data.price,
      estoque: data.stock,
      imagem: data.image,
      marca: data.brand,
    }
  };
}

export const ReturnDataProductIndex = (data: { id: number, name: string, price: number, stock: number }) => {
  return {
    data:{
      id: data.id,
      nome: data.name,
      preço: data.price,
      estoque: data.stock,
    }
  };
}

export const ReturnDataProductShow = (data): ResponseProductDTO => {
  return {
    message: '',
    data:{
      id: data.id,
      nome: data.name,
      descricao: data.description,
      preço: data.price,
      estoque: data.stock,
      imagem: data.image,
      marca: data.brand,
      cadastrado_em: new Date(data.createdAt).toLocaleString(),
      atualizado_em: new Date(data.updatedAt).toLocaleString(),
    }
  };
}