export interface IProductDTO {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  thumbnail?: string;
  brand?: string;
  sold_quantity?: number;
  category?: string;
  specifications?: string;
  manufacturer?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDTO {
  data: IProductDTO; 
}

export interface ProductIndexDTO {
  data: IProductDTO[];
}