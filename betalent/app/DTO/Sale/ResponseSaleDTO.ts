export interface ResponseSaleDTO {
  data: {
    id: number;
    cliente: string;
    produto: string;
    quantidade: number;
    preco: number;
    valor_total: number;
  }
}