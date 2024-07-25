import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';
import { ValidateCPF, ValidateEmail, ValidatePhone } from 'App/Utils/Validator';

export default class UserClient {
  constructor(
    private clientModel = Client,
    private returnDefaultMsg = ReturnDefaultMsg,
    private validateEmail = ValidateEmail,
    private validatePhone = ValidatePhone,
    private validateCPF = ValidateCPF,
    private db = Database,
  ) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['email', 'phone', 'cpf', 'name']);      

      const client = await this.clientModel.create(data);

      return response.status(201).json({
        ...this.returnDefaultMsg.created,
        data: client,
      });

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err
      });
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      
      const clients = await this.db.query().select('id', 'name as nome','email').from('clients');

      if(clients.length === 0) return response.status(200).json([]);

      return response.status(200).json({
        ...this.returnDefaultMsg.ok,
        data: clients,
      });

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err
      });
    }
  }

  public async show({ params, request, response }: HttpContextContract) {
    try {
      // Obtém os dados do cliente
      const dataclient = await this.db
        .query()
        .select('id', 'name as nome', 'cpf', 'email', 'phone as telefone')
        .from('clients')
        .where('id', params.id)
        .first();
  
      // Verifica se o cliente existe
      if (!dataclient) {
        return response.notFound({
          ...this.returnDefaultMsg.notFound,
          error: this.returnDefaultMsg.clientNotFound,
        });
      }
  
      // Obtém os parâmetros de consulta para filtrar vendas por mês e ano
      const month = request.input('month');
      const year = request.input('year');
  
      // Constrói a consulta para obter as vendas
      let salesQuery = this.db
        .query()
        .select(
          'sales.id as venda_id',
          'sales.quantity as quantidade',
          'sales.unity_price as valor_unitario',
          'sales.total_price as total',
          'sales.created_at as data_venda',
          'products.name as produto',
          'products.description as descricao',
          'products.brand as marca',
          'products.image as imagem',
        )
        .from('sales')
        .where('sales.client_id', params.id)
        .join('products', 'sales.product_id', 'products.id')
        .orderBy('sales.created_at', 'desc');
  
      // Aplica o filtro por mês e ano, se fornecido
      if (month && year) {
        salesQuery = salesQuery
          .whereRaw('EXTRACT(MONTH FROM sales.created_at) = ?', [month])
          .whereRaw('EXTRACT(YEAR FROM sales.created_at) = ?', [year]);
      }
  
      // Executa a consulta das vendas
      const sales = await salesQuery;
  
      // Adiciona as vendas ao objeto do cliente
      dataclient.vendas = sales;
  
      // Retorna a resposta com os dados do cliente e suas vendas
      return response.status(200).json({
        ...this.returnDefaultMsg.ok,
        data: dataclient,
      });
      
    } catch (err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err,
      });
    }
  }
   

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.only(['email', 'phone', 'cpf', 'name']);

      const client = await this.clientModel.find(params.id);

      if (!client) {
        return response.notFound({
          ...this.returnDefaultMsg.notFound,
          error: this.returnDefaultMsg.clientNotFound,
        });
      }

      if (data.email && !this.validateEmail(data.email)) {
        return response.badRequest({
          ...this.returnDefaultMsg.badRequest,
          error: this.returnDefaultMsg.invalidEmail,
        });
      } else if (data.phone && !this.validatePhone(data.phone)) {
        return response.badRequest({
          ...this.returnDefaultMsg.badRequest,
          error: this.returnDefaultMsg.invalidPhone,
        });
      } else if (data.cpf && !this.validateCPF(data.cpf)) {
        return response.badRequest({
          ...this.returnDefaultMsg.badRequest,
          error: this.returnDefaultMsg.invalidCPF,
        });
      }

      client.merge(data);
      await client.save();

      return response.status(200).json({
        ...this.returnDefaultMsg.updated,
        data: client,
      });

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const client = await this.clientModel.find(params.id);

      if (!client) {
        return response.notFound({
          ...this.returnDefaultMsg.notFound,
          error: this.returnDefaultMsg.clientNotFound,
        });
      }

      await client.delete();

      return response.status(200).json({
        ...this.returnDefaultMsg.deleted,
        data: client,
      });

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err
      });
    }
  }
}