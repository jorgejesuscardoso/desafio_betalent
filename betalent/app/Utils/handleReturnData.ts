import { ClientDTO, ResponseCreateClientDTO, IClientDTO } from 'App/DTO/ClientDTO';
import { MergeSaleDTO } from 'App/DTO/SaleDTO';
import { UserDTO } from 'App/DTO/UserDTO';
import Product from 'App/Models/Product';
import User from 'App/Models/User';

// Lida com retorno de datas UTC-3
export const FormatDate = (date: string): string => {
  return new Date(date.toLocaleString()).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
}

// USUÁRIOS
export const FormatDataUserToReturn = (user: User): UserDTO => {
  return {
    data:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: FormatDate(user.created_at.toLocaleString()),
      updated_at: FormatDate(user.updated_at.toLocaleString()),
    }
  };
};

// CLIENTES
export const FormatDataClientToReturnStore = (id: number, data: ResponseCreateClientDTO): ClientDTO => {
  return {
    data:{
      id: id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      created_at: new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
      updated_at: new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
      address: {
        id: data.address.id,
        street: data.address.street,
        number: data.address.number,
        zip_code: data.address.zip_code,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,

      }
    }
  };
}

export const FormatDataClientToReturnIndex = (data: { id: number, name: string, email: string, number: string }[] ): IClientDTO[] => {
  const response = data.map((client) => {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.number,
    }
  })

  return response;
}

export const FormatDataClientToReturnUpdate = ({ client, phone, address }): IClientDTO => {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: phone.number,
    cpf: client.cpf,
    address: {
      id: address.id,
      street: address.street,
      number: address.number,
      zip_code: address.zip_code,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,      
    }
  }
}

// PRODUTOS
export const FormatDataProductToReturn = ( product: Product) => {
  return {
    data:{
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      brand: product.brand,
      created_at: new Date(product.created_at.toLocaleString()).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
      updated_at: new Date(product.updated_at.toLocaleString()).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
    }
  };
}

export const FormatDataProductToReturnIndex = (data: Product) => {
  return {
    data:{
      id: data.id,
      name: data.name,
      price: data.price,
      stock: data.stock,
    }
  };
}

// VENDAS
export const FormatDataSaleToReturn = (data: MergeSaleDTO): MergeSaleDTO => {
  return {
    id: data.id,
    client_name: data.client_name,
    product_name: data.product_name,
    quantity: data.quantity,
    unity_price: data.unity_price,
    total_price: data.total_price,
    sale_date: new Date(data.sale_date.toLocaleString()).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
  }
}

export const FormatDataSaleToReturnShow = ({sale, client, product}): MergeSaleDTO => {
  return {
    id: sale.id,
    client_name: client.name,
    product_name: product.name,
    quantity: sale.quantity,
    unity_price: sale.unity_price,
    total_price: sale.total_price,
    sale_date: new Date(sale.created_at.toLocaleString()).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
  }
}
