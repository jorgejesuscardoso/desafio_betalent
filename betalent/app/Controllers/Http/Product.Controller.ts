import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ResponseProductDTO, ResponseProductStoreDTO } from 'App/DTO/product/ResponseProduct';
import Product from 'App/Models/Product';
import { ReturnDataProductIndex, ReturnDataProductShow, ReturnDataProductStore } from 'App/Utils/handleReturnData';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';

export default class ProductController {
  constructor(
    private productModel = Product,
    private returnDefaultResponse = ReturnDefaultMsg,
    private returnDataProductStore = ReturnDataProductStore,
    private returnDataProductIndex = ReturnDataProductIndex,
    private returnDataProductShow = ReturnDataProductShow,
  ) {}

  public async store ({ request, response }: HttpContextContract): Promise<ResponseProductStoreDTO | { message: string, error: string }> {
    try {
      const data = request.only(['name', 'description', 'price', 'stock', 'image', 'brand']);

      // Cria um novo produto
      const product = await this.productModel.create(data);

      if (!product) {
        response.status(400)
        return{
          ...this.returnDefaultResponse.badRequest,
          error: this.returnDefaultResponse.createProductError.message,
        };
      }

      // Formata os dados para serem retornados
      const dataProduct =  this.returnDataProductStore(product.id, product).data;


      response.status(201)

      return {
        ...this.returnDefaultResponse.created,
        data: dataProduct,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async index ({ response }: HttpContextContract) {
    try {

      // Busca todos os produtos que não foram marcados como deletados
      const products = await this.productModel.query().where('is_deleted', false).orderBy('name', 'asc');

      if (!products) return response.status(200).json([]);

      // Formata os dados para serem retornados
      const dataProduct = products.map(product => this.returnDataProductIndex(product).data );

      response.status(200)

      return {
        ...this.returnDefaultResponse.ok,
        data: dataProduct,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async show ({ response, params }: HttpContextContract): Promise<{ message: string, error: string } | ResponseProductDTO> {
    try {

      // Busca o produto pelo id retornando apenas se não foi marcado como deletado
      const product = await this.productModel.query().where('id', params.id).andWhere('is_deleted', false).first();

      if (!product) {
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.productNotFound.message,
        };
      }

      // Formata os dados para serem retornados
      const dataProduct =  this.returnDataProductShow(product).data;

      response.status(200)

      return {
        ...this.returnDefaultResponse.ok,
        data: dataProduct,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async update ({ request, response, params }: HttpContextContract): Promise<{ message: string, error: string } | ResponseProductDTO> {
    try {

      const data = request.only(['name', 'description', 'price', 'stock', 'image', 'brand']);

      // Busca o produto pelo id retornando apenas se não foi marcado como deletado
      const product = await this.productModel.query().where('id', params.id).andWhere('is_deleted', false).first();

      if (!product) {
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.productNotFound.message,
        };
      }

      // Atualiza os dados do produto
      product.merge(data);
      await product.save();

      const dataProduct = this.returnDataProductShow(product).data;

      response.status(200)

      return {
        ...this.returnDefaultResponse.ok,
        data: dataProduct,
      }
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  }

  public async destroy ({ response, params }: HttpContextContract): Promise<void | { message: string, error: string }> {
    try {
      // Busca o produto pelo id
      const getProduct = await this.productModel.findBy('id', params.id);

      if (!getProduct) {
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.productNotFound.message,
        };
      }

      // Verifica se o produto não está marcado como deletado
      if (getProduct?.is_deleted ) {
        response.status(404)
        return{
          ...this.returnDefaultResponse.notFound,
          error: this.returnDefaultResponse.productNotFound.message,
        };
      }

      // Marca o produto como deletado sem excluir do banco
      await this.productModel.query().where('id', params.id).update({ is_deleted: true });

      response.status(204)

      return;
    } catch (error) {
      response.status(500)
      return {
        ...this.returnDefaultResponse.internalServerError,
        error: error.message,
      }
    }
  } 
}