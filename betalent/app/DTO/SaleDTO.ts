export interface ISaleDTO {
  id?: number;
  client_id: number;
  product_id: number;
  quantity: number;
  unity_price: number;
  total_price: number;
  created_at?: string;
  updated_at?: string;
}


export interface MergeSaleDTO {
  id?: number;
  client_id?: number;
  client_name: string;
  product_name: string;
  product_id?: number;
  quantity: number;
  unity_price: number;
  total_price: number;
  sale_date: string;
}
export interface SaleDTO {
  data: MergeSaleDTO;
}
export interface SaleIndexDTO {
  data: MergeSaleDTO[];
}