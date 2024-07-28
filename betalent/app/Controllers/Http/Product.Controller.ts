import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ProductDTO, ProductIndexDTO  } from 'App/DTO/ProductDTO';
import Product from 'App/Models/Product';
import {
  FormatDataProductIndex,
  FormatDataProduct,
} from 'App/Utils/formatData';
import { HandleSaveImage } from 'App/Utils/handleImageUpload';
import { DefaultMsg } from 'App/Utils/defaultMsg';

export default class ProductController {
  constructor(
    private productModel = Product,
    private handleSaveimage = HandleSaveImage,
    private defaultMsg = DefaultMsg,
    private formatDataProducts = FormatDataProduct,
    private formatDataProductsIndex = FormatDataProductIndex,
  ) {}

  public async store ({ request, response }: HttpContextContract): Promise<void | ProductDTO> {
    try {
      const requestData = request.only(['name', 'description', 'price', 'stock', 'thumbnail', 'brand']);

      const thumbnail = request.file('thumbnail');

      if (thumbnail) {
        const handleImage = await this.handleSaveimage(thumbnail, requestData.name); // Utiliza a função para salvar a imagem e retornar o nome da mesma
        
        if (!handleImage) return response.status(500).json(this.defaultMsg.errorSavingImage);

        requestData.thumbnail = handleImage.thumbName; // Adiciona o nome da imagem ao objeto de dados
      }

      // Cria um novo produto
      const product = await this.productModel.create(requestData);

      if (!product) return response.status(500).json(this.defaultMsg.errorCreatingProduct);

      response.status(201)

      // Formata as datas para serem retornadas
      const data = this.formatDataProducts(product).data;

      return {
        data,
      }
    } catch (error) {
     return response.status(500).json({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  }

  public async index ({ response }: HttpContextContract): Promise<void | ProductIndexDTO> {
    try {

      // Busca todos os produtos que não foram marcados como deletados
      const products = await this.productModel.query().where('is_deleted', false).orderBy('name', 'asc');

      // Formata os dados para serem retornados
      const data = products.map(product => this.formatDataProductsIndex(product).data );

      response.status(200)

      return {
        data,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.defaultMsg.serverError,
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

      if (!product) return response.status(404).json(this.defaultMsg.productNotFound);

      // Formata os dados para serem retornados
      const data =  this.formatDataProducts(product).data;

      response.status(200)

      return {
        data,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  }

  public async update ({ request, response, params }: HttpContextContract): Promise<void | ProductDTO> {
    try {

      const requestData = request.only(['name', 'description', 'price', 'stock', 'thumbnail', 'brand']);

      const thumbnail = request.file('thumbnail');      

      // Busca o produto pelo id retornando apenas se não foi marcado como deletado
      const product = await this.productModel
      .query()
      .where('id', params.id)
      .andWhere('is_deleted', false)
      .first();

      if (!product) return response.status(404).json(this.defaultMsg.productNotFound);

      if (thumbnail) {
        const handleImage = await this.handleSaveimage(thumbnail, product.name);

        if (!handleImage) return response.status(500).json(this.defaultMsg.errorSavingImage);

        requestData.thumbnail = handleImage.thumbName;
      }

      // Atualiza os dados do produto
      product.merge(requestData);
      await product.save();

      // Formata os dados para serem retornados
      const data = this.formatDataProducts(product).data;

      response.status(200)

      return {
        data,
      }
    } catch (error) {
      return response.status(500).json({
        ...this.defaultMsg.serverError,
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

      if (!product) return response.status(404).json(this.defaultMsg.productNotFound);

      // Marca o produto como deletado sem excluir do banco
      product.merge({ is_deleted: true });
      await product.save();

      response.status(204)

      return;
    } catch (error) {
      return response.status(500).json({
        ...this.defaultMsg.serverError,
        error: error.message,
      })
    }
  } 
}