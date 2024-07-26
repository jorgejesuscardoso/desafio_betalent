export interface ResponseProductStoreDTO {
  message: string;
  data: {
    id: number;
    nome: string;
    descricao: string;
    preço: number;
    estoque: number;
    imagem: string;
    marca: string;
  };  
}

export interface ResponseProductDTO{
  message: string;
  data: {
    id: number;
    nome: string;
    descricao: string;
    preço: number;
    estoque: number;
    imagem: string;
    marca: string;
    cadastrado_em: string;
    atualizado_em: string;
  };
}