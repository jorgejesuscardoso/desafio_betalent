export interface IProductDTO {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  thumbnail?: string;
  brand?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDTO {
  data: IProductDTO; 
}

export interface ProductIndexDTO {
  data: IProductDTO[];
}