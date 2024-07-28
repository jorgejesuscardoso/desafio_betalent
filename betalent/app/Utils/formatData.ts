import { ClientDTO, ResponseCreateClientDTO, IClientDTO, ClientToIndex } from 'App/DTO/ClientDTO';
import { ProductDTO } from 'App/DTO/ProductDTO';
import { MergeSaleDTO, MergeSaleIndexDTO } from 'App/DTO/SaleDTO';
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

  return momentDate.tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
}

// USUÁRIOS
export const FormatDataUser = (user: User): UserDTO => {
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
export const FormatDataClientStore = (client , data: ResponseCreateClientDTO): ClientDTO => {
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

export const FormatDataClientIndex = (data: ClientToIndex[] ): IClientDTO[] => {
  const response = data.map((client) => {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phones.number,
    }
  })

  return response;
}

export const FormatDataClientUpdate = ({ client, phone, address }): IClientDTO => {
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

export const FormatDataClientShow = (getClient): ClientDTO => {

  // Formata os dados de vendas
  const sales = getClient.sales.map((sale) => {
    return {
      id: sale.id,
      productId: sale.product.id,
      productName: sale.product.name,
      quantity: sale.quantity,
      unityPrice: sale.unity_price,
      totaLPrice: sale.total_price,
      saleDate: FormatDate(sale.created_at),
    }
  });

  // Formata os dados do endereço
  const address = {
      id: getClient.addresses.id,
      street: getClient.addresses.street,
      number: getClient.addresses.number,
      zipCode: getClient.addresses.zip_code,
      neighborhood: getClient.addresses.neighborhood,
      city: getClient.addresses.city,
      state: getClient.addresses.state,
    }
 
  const data = {
    id: getClient.id,
    name: getClient.name,
    email: getClient.email,
    phone: getClient.phones.number,
    cpf: getClient.cpf,
    createdAt: FormatDate(getClient.created_at),
    updatedAt: FormatDate(getClient.updated_at),
    address,
    sales,
  };
  
  return { data };
}

// PRODUTOS
export const FormatDataProduct = ( product: Product): ProductDTO => {
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

export const FormatDataProductIndex = (data: Product) => {
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
export const FormatDataSale = (data: MergeSaleDTO): MergeSaleDTO => {
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

export const FormatDataSaleIndex = ({sale, client, product}): MergeSaleIndexDTO => {
  return {
    id: sale.id,
    client_name: client.name,
    product_name: product.name,
    quantity: sale.quantity,
    total_price: sale.total_price,
    sale_date: FormatDate(sale.created_at),
  }
}

export const FormatDataSaleShow = ({sale, client, product}): MergeSaleDTO => {
  return {
    id: sale.id,
    client_name: client.name,
    client_id: client.id,
    product_name: product.name,
    product_id: product.id,
    quantity: sale.quantity,
    unity_price: sale.unity_price,
    total_price: sale.total_price,
    sale_date: FormatDate(sale.created_at),
  }
}
