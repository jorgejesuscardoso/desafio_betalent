import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ProductDTO, ProductIndexDTO  } from 'App/DTO/ProductDTO';
import Product from 'App/Models/Product';
import {
  FormatDataProductToReturnIndex,
  FormatDataProductToReturn,
} from 'App/Utils/handleFormatDataToReturn';
import { HandleSaveAndGiveNameToImage } from 'App/Utils/handleImageUpload';
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg';

export default class ProductController {
  constructor(
    private productModel = Product,
    private returnDefaultResponse = ReturnDefaultMsg,
    private formatDataToReturnProducts = FormatDataProductToReturn,
    private formatDataToReturnProductsIndex = FormatDataProductToReturnIndex,
  ) {}

  public async store ({ request, response }: HttpContextContract): Promise<void | ProductDTO> {
    try {
      const data = request.only(['name', 'description', 'price', 'stock', 'thumbnail', 'brand']);

      const thumbnail = request.file('thumbnail');

      if (thumbnail) {
        const handleImage = await HandleSaveAndGiveNameToImage(thumbnail, data.name); // Utiliza a função para salvar a imagem e retornar o nome da mesma
        
        if (!handleImage) return response.status(500).json(this.returnDefaultResponse.errorSavingImage);

        data.thumbnail = handleImage.thumbName; // Adiciona o nome da imagem ao objeto de dados
      }

      // Cria um novo produto
      const product = await this.productModel.create(data);

      if (!product) return response.status(500).json(this.returnDefaultResponse.errorCreatingProduct);

      response.status(201)

      // Formata as datas para serem retornadas
      const dataFormatted = this.formatDataToReturnProducts(product).data;

      return {
        data: dataFormatted,
      }
    } catch (error) {
     return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      })
    }
  }

  public async index ({ response }: HttpContextContract): Promise<void | ProductIndexDTO> {
    try {

      // Busca todos os produtos que não foram marcados como deletados
      const products = await this.productModel.query().where('is_deleted', false).orderBy('name', 'asc');

      // Formata os dados para serem retornados
      const dataFormatted = products.map(product => this.formatDataToReturnProductsIndex(product).data );

      response.status(200)

      return {
        data: dataFormatted,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      })
    }
  }

  public async show ({ response, params }: HttpContextContract): Promise<void | ProductDTO> {
    try {

      // Busca o produto pelo id retornando apenas se não foi marcado como deletado
      const product = await this.productModel
      .query()
      .where('id', params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!product) return response.status(404).json(this.returnDefaultResponse.productNotFound);

      // Formata os dados para serem retornados
      const dataFormatted =  this.formatDataToReturnProducts(product).data;

      response.status(200)

      return {
        data: dataFormatted,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      })
    }
  }

  public async update ({ request, response, params }: HttpContextContract): Promise<void | ProductDTO> {
    try {

      const data = request.only(['name', 'description', 'price', 'stock', 'image', 'brand']);

      // Busca o produto pelo id retornando apenas se não foi marcado como deletado
      const product = await this.productModel
      .query()
      .where('id', params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!product) return response.status(404).json(this.returnDefaultResponse.productNotFound);

      // Atualiza os dados do produto
      product.merge(data);
      await product.save();

      // Formata os dados para serem retornados
      const dataFormatted = this.formatDataToReturnProducts(product).data;

      response.status(200)

      return {
        data: dataFormatted,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      })
    }
  }

  public async destroy ({ response, params }: HttpContextContract): Promise<void> {
    try {

      // Busca o produto pelo id
      const product = await this.productModel
      .query()
      .where('id', params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!product) return response.status(404).json(this.returnDefaultResponse.productNotFound);

      // Marca o produto como deletado sem excluir do banco
      product.merge({ is_deleted: true });
      await product.save();

      response.status(204)

      return;
    } catch (error) {
      return response.status(500).json({
        ...this.returnDefaultResponse.serverError,
        error: error.message,
      })
    }
  } 
}