import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Address from 'App/Models/Address';
import Client from 'App/Models/Client';
import Phone from 'App/Models/Phone';
import { ReturnDataCLientStore, ReturnDataClientIndex } from 'App/Utils/handleReturnData';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';

export default class UserClient {
  constructor(
    private clientModel = Client,
    private phoneModel = Phone,
    private addressModel = Address,
    private returnDefaultMsg = ReturnDefaultMsg,
    private returnDataCLientStore = ReturnDataCLientStore,
    private returnDataClientIndex = ReturnDataClientIndex,
    private db = Database,
  ) {}

  public async store({ request, response }: HttpContextContract) {
    const trx = await Database.transaction(); // Inicia uma nova transação
  
    try {
      const data = request.only(['email', 'phone', 'cpf', 'name', 'address']);
  
      const dataToTableClient = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
      };
  
      // Cria um novo cliente usando a transação
      const client = await this.clientModel.create(dataToTableClient, { client: trx });
  
      const dataToTablePhone = {
        number: data.phone,
        client_id: client.id,
      };
  
      // Cria um novo telefone usando a transação
      await this.phoneModel.create(dataToTablePhone, { client: trx });
  
      const dataToTableAddress = {
        ...data.address,
        client_id: client.id,
      };
  
      // Cria um novo endereço usando a transação
      await this.addressModel.create(dataToTableAddress, { client: trx });
  
      await trx.commit(); // Confirma a transação se todas as operações forem bem-sucedidas
      
      const dataClient = this.returnDataCLientStore(client.id, data).data;
      
      return response.status(201).json({
        ...this.returnDefaultMsg.created,
        data: dataClient,
      });
  
    } catch (err) {

      await trx.rollback(); // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err.message,
      });
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      
      const clients = await this.db.query().select('*').from('clients').join('phones', 'clients.id', 'phones.client_id');

      if(clients.length === 0) return response.status(200).json([]);

      const data = this.returnDataClientIndex(clients);

      return response.status(200).json({
        ...this.returnDefaultMsg.ok,
        data
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
        .select('id', 'name as nome', 'cpf', 'email', 'created_at as cadastro_data', 'updated_at as ultima_att')
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

      const getAddress = await this.db.query().select('id as endereço_id','street as rua', 'number as numero', 'zip_code as cep', 'neighborhood as bairro', 'city as cidade', 'state as estado').from('addresses').where('client_id', params.id).first();

      const getPhone = await this.db.query().select('number as telefone').from('phones').where('client_id', params.id).first();

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
  
      // Adiciona as vendas, telefone e endereço ao objeto do cliente
      dataclient.telefone = getPhone.telefone;
      dataclient.endereco = getAddress;
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
    // Inicia uma nova transação
    const trx = await this.db.transaction();

    try {
      
      const { name, email, phone, cpf, address } = request.body();

      // Busca o cliente, endereço e telefone no banco de dados
      const client = await this.clientModel.find(params.id);
      const addressClient = await this.addressModel.findBy('client_id', params.id);
      const phoneClient = await this.phoneModel.findBy('client_id', params.id);

     
      if (!client || !addressClient || !phoneClient) {
        await trx.rollback();  // Reverte a transação se não encontrar
        return response.notFound({
          ...this.returnDefaultMsg.notFound,
          error: this.returnDefaultMsg.clientNotFound,
        });
      }

      // Dados a serem atualizados na tabela de clientes
      const dataToClientTable = {
        name,
        email,
        cpf,    
      };

      // Dados a serem atualizados na tabela de endereços
      const dataToAddress = {
        street: address?.street ?? addressClient.street,
        number: address?.number ?? addressClient.number,
        zip_code: address?.zip_code ?? addressClient.zip_code,
        neighborhood: address?.neighborhood ?? addressClient.neighborhood,
        city: address?.city ?? addressClient.city,
        state: address?.state ?? addressClient.state,
      };
      
      // Vincula a transação às operações dos modelos
      client.useTransaction(trx);
      addressClient.useTransaction(trx);
      phoneClient.useTransaction(trx);

      client.merge(dataToClientTable);
      await client.save();

      addressClient.merge(dataToAddress);
      await addressClient.save();

      phoneClient.merge({ number: phone || phoneClient.number });
      await phoneClient.save();

      // Confirma a transação
      await trx.commit();

      return response.status(200).json({
        ...this.returnDefaultMsg.updated,
        data: request.body(),
        address: addressClient,
      });

    } catch (err) {
      await trx.rollback();  // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.returnDefaultMsg.internalServerError,
        error: err,
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