import { ClientDTO, ResponseCreateClientDTO, IClientDTO } from 'App/DTO/ClientDTO';
import { MergeSaleDTO } from 'App/DTO/SaleDTO';
import { UserDTO } from 'App/DTO/UserDTO';
import Product from 'App/Models/Product';
import User from 'App/Models/User';
import moment from 'moment-timezone';

// Manipular as datas para retornar no formato padrão
export const FormatDate = (date): string => {
 
  const momentDate = moment(date.toISO());

  if (!momentDate.isValid()) {
    throw new Error('Invalid date');
  }

  return momentDate.utc().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
}

// USUÁRIOS
export const FormatDataUserToReturn = (user: User): UserDTO => {
  return {
    data:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: FormatDate(user.created_at),
      updated_at: FormatDate(user.updated_at),
    }
  };
};

// CLIENTES
export const FormatDataClientToReturnStore = (client , data: ResponseCreateClientDTO): ClientDTO => {
  return {
    data:{
      id: client.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      created_at: FormatDate(client.created_at),
      updated_at: FormatDate(client.updated_at),
      address: {
        id: data.address.id,
        street: data.address.street,
        number: data.address.number,
        zipCode: data.address.zip_code,
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
      zipCode: address.zip_code,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,      
    }
  }
}

export const FormatDataClientToReturnShow = ({
  getClient,
  getAddress,
  getPhone,
  getSales,
}) => {
 
  const data = {
    id: getClient.id,
    name: getClient.name,
    email: getClient.email,
    phone: getPhone.number,
    cpf: getClient.cpf,
    createdAt: FormatDate(getClient.created_at),
    updatedAt: FormatDate(getClient.updated_at),
    address: {
      id: getAddress.id,
      street: getAddress.street,
      number: Number(getAddress.number),
      neighborhood: getAddress.neighborhood,
      city: getAddress.city,
      state: getAddress.state,
      zipCode: getAddress.zip_code,
    },
    sales: getSales,
  };
  
  return { data };
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
      thumbnail: product.thumbnail,
      brand: product.brand,
      created_at: FormatDate(product.created_at),
      updated_at: FormatDate(product.updated_at),
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
    sale_date: data.sale_date,
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
    sale_date: FormatDate(sale.created_at),
  }
}
