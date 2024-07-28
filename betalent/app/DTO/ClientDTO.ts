export interface IClientDTO {
  id?: number;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  address?: {
    id?: number;
    street: string;
    number: string;
    zipCode: string;
    neighborhoods: string;
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
    neighborhoods: string;
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

export interface ClientToIndex { id: number, name: string, email: string, phones: { number: string } }