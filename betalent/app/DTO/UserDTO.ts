export interface IUserDTO {
  id?: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserDTO {
  data: IUserDTO;
}

export interface UserIndexDTO {
  data: IUserDTO[];
}