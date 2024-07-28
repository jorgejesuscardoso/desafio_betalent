import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { ClientDTO, ClientIndexDTO } from 'App/DTO/ClientDTO';
import Address from 'App/Models/Address';
import Client from 'App/Models/Client';
import Phone from 'App/Models/Phone';
import { FormatDataClientStore,
  FormatDataClientIndex,
  FormatDataClientUpdate,
  FormatDataClientShow,
} from 'App/Utils/formatData';
import { DefaultMsg } from 'App/Utils/defaultMsg';

export default class UserClient {
  constructor(
    private clientModel = Client,
    private phoneModel = Phone,
    private addressModel = Address,
    private defaultMsg = DefaultMsg,
    private formatDataUpdate = FormatDataClientUpdate,
    private formatDataStore = FormatDataClientStore,
    private formatDataIndex = FormatDataClientIndex,
    private formatDataShow = FormatDataClientShow,
    private db = Database,
  ) {}

  public async store({
    request,
    response,
  }: HttpContextContract): Promise<void | ClientDTO> {

    const trx = await Database.transaction(); // Inicia uma nova transação
  
    try {
      // Validações e tratamento dos dados são feitos no middleware.
      const requestData = request.only(['email', 'phone', 'cpf', 'name', 'address']);
  
      const client = {
        name: requestData.name,
        email: requestData.email,
        cpf: requestData.cpf,
      };
  
      // Cria um novo cliente usando a transação
      const clientData = await this.clientModel.create(client, { client: trx });
  
      const phone = {
        number: requestData.phone,
        client_id: clientData.id,
      };
  
      // Cria um novo telefone usando a transação
      await this.phoneModel.create(phone, { client: trx });
  
      const address = {
        ...requestData.address,
        client_id: clientData.id,
      };
  
      // Cria um novo endereço usando a transação
      await this.addressModel.create(address, { client: trx });
  
      await trx.commit(); // Confirma a transação se todas as operações forem bem-sucedidas
   
      const data = this.formatDataStore(clientData, requestData).data;
      
      response.status(201);

      return { data };
  
    } catch (err) {

      await trx.rollback(); // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      });
    }
  }

  public async index({
    response,
  }: HttpContextContract): Promise<void | ClientIndexDTO> {
    try {

      // Aplicando eager loading para trazer os telefones      
      const clients = await this.clientModel
      .query()
      .preload('phones')
      .orderBy('id', 'asc');

      const data = this.formatDataIndex(clients);

      response.status(200);
      return { data };

    } catch(err) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      });
    }
  }

  public async show({
    params,
    request,
    response
  }: HttpContextContract): Promise<void | ClientDTO> {
    try {
      const { month, year } = request.qs();
  
      // Aplicando eager loading para trazer os dados relacionados
      const client = await this.clientModel
        .query()
        .where('id', params.id)
        .select('*')
        .preload('phones')
        .preload('addresses')
        .preload('sales', (saleQuery) => {
          saleQuery
            .preload('product', (productQuery) => {
              productQuery
                .select('*');
            })
            .orderBy('created_at', 'desc');

          if (month && year) {
            saleQuery.whereRaw(`extract(month from created_at) = ${month} and extract(year from created_at) = ${year}`);
          } else if (month) {
            saleQuery.whereRaw(`extract(month from created_at) = ${month}`);
          } else if (year) {
            saleQuery.whereRaw(`extract(year from created_at) = ${year}`);
          }
        });
      
      if (!client) {
        return response.status(404).json(this.defaultMsg.clientNotFound);
      }

      const data = this.formatDataShow(client[0]);  
      
      response.status(200);
      return data;
  
    } catch (err) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      });
    }
  }  

  public async update({
    request,
    params,
    response,
  }: HttpContextContract): Promise<void | ClientDTO> {
    // Inicia uma nova transação
    const trx = await this.db.transaction();
    try {
      // Validações e tratamento dos dados são feitos no middleware.
      
      const { name, email, phone, cpf, address } = request.body();

      // Busca o cliente, endereço e telefone no banco de dados
      const getClient = await this.clientModel.find(params.id);
      const getClientAddress = await this.addressModel.findBy('client_id', params.id);
      const getClientPhone = await this.phoneModel.findBy('client_id', params.id);
     
      if (!getClient || !getClientAddress || !getClientPhone) {
        await trx.rollback();  // Reverte a transação se não encontrar
        return response.status(404).json(this.defaultMsg.clientNotFound);
      }

      // Dados a serem atualizados na tabela de clientes
      const clientData = {
        name,
        email,
        cpf,    
      };

      // Dados a serem atualizados na tabela de endereços
      const addressData = {
        street: address?.street ?? getClientAddress.street,
        number: address?.number ?? getClientAddress.number,
        zip_code: address?.zip_code ?? getClientAddress.zip_code,
        neighborhood: address?.neighborhood ?? getClientAddress.neighborhood,
        city: address?.city ?? getClientAddress.city,
        state: address?.state ?? getClientAddress.state,
      };
      
      // Vincula a transação às operações dos modelos
      getClient.useTransaction(trx);
      getClientAddress.useTransaction(trx);
      getClientPhone.useTransaction(trx);

      getClient.merge(clientData);
      await getClient.save();

      getClientAddress.merge(addressData);
      await getClientAddress.save();

      getClientPhone.merge({ number: phone || getClientPhone.number });
      await getClientPhone.save();

      // Confirma a transação
      await trx.commit();

      const data = this.formatDataUpdate({ client: getClient , phone: getClientPhone, address: getClientAddress });

      response.status(200);

      return { data };

    } catch (err) {
      await trx.rollback();  // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      });
    }
  }

  public async destroy({
    params,
    response
  }: HttpContextContract): Promise<void> {
    try {
      const client = await this.clientModel.find(params.id);

      if (!client) return response.status(404).json(this.defaultMsg.clientNotFound);

      await client.delete();

      response.status(204);
      return;

    } catch(err) {
      return response.internalServerError({
        ...this.defaultMsg.serverError,
        error: err.message,
      });
    }
  }
}