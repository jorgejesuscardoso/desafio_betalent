export interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: {
    id: number;
    street: string;
    number: string;
    zip_code: string;
    neighborhood: string;
    city: string;
    state: string;
  }
}