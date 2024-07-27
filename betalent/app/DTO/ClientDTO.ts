export interface IClientDTO {
  id?: number;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  address?: {
    id?: number;
    street: string;
    number: number;
    zipCode: string;
    neighborhood: string;
    city: string;
    state: string;
  }
  created_at?: string;
  updated_at?: string;
}

export interface ResponseCreateClientDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    id: number;
    street: string;
    number: number;
    zip_code: string;
    neighborhood: string;
    city: string;
    state: string;
  }
  created_at?: string;
  updated_at?: string;
}

export interface ClientDTO {
  data: IClientDTO;
}

export interface ClientIndexDTO {
  data: IClientDTO[];
}