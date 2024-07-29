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
    }
  };
};

export const FormatDataUserShow = (user: User): UserDTO => {
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
        number: (data.address.number).toString(),
        zipCode: data.address.zip_code,
        neighborhoods: data.address.neighborhoods,
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

export const FormatDataClientUpdate = (dataClient, dataResquest): IClientDTO => {
  return {
    id: dataClient.id,
    name: dataResquest.name ?? dataClient.name,
    email: dataResquest.email ?? dataClient.email,
    phone: dataResquest.phone ?? dataClient.phones.number,
    cpf: dataResquest.cpf ?? dataClient.cpf,
    created_at: FormatDate(dataClient.created_at),
    updated_at: FormatDate(dataClient.updated_at),
    address: {
      id: dataClient.addresses.id,
      street: dataResquest.address.street ?? dataClient.addresses.street,
      number: dataResquest.address.number ?? dataClient.addresses.number,
      zipCode: dataResquest.address.zip_code ?? dataClient.addresses.zip_code,
      neighborhoods: dataResquest.address.neighborhoods ?? dataClient.addresses.neighborhoods,
      city: dataResquest.address.city ?? dataClient.addresses.city,
      state: dataResquest.address.state ?? dataClient.addresses.state,
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
      thumbnail: sale.product.thumbnail,
    }
  });

  // Formata os dados do endereço
  const address = {
      id: getClient.addresses.id,
      street: getClient.addresses.street,
      number: getClient.addresses.number,
      zipCode: getClient.addresses.zip_code,
      neighborhoods: getClient.addresses.neighborhoods,
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
      sold_quantity: product.sold_quantity,
      thumbnail: product.thumbnail,
      manufacturer: product.manufacturer,
      brand: product.brand,
      category: product.category,
      specifications: product.specifications,
      status: product.status,
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
export const FormatDataSale = ({ sale, client, product }): MergeSaleDTO => {
  return {
    id: sale.id,
    client_name: client.name,
    product_name: product.name,
    quantity: sale.quantity,
    unity_price: sale.unity_price,
    total_price: sale.total_price,
    sale_date: sale.sale_date,
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
