import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { ClientDTO, ClientIndexDTO } from 'App/DTO/ClientDTO';
import Address from 'App/Models/Address';
import Client from 'App/Models/Client';
import Phone from 'App/Models/Phone';
import Product from 'App/Models/Product';
import { FormatDataClientToReturnStore,
  FormatDataClientToReturnIndex,
  FormatDataClientToReturnUpdate,
  FormatDataClientToReturnShow,
} from 'App/Utils/handleFormatDataToReturn';
import { ReturnDefaultMsg } from 'App/Utils/ReturnDefaultMsg';

export default class UserClient {
  constructor(
    private clientModel = Client,
    private phoneModel = Phone,
    private addressModel = Address,
    private productModel = Product,
    private returnDefaultMsg = ReturnDefaultMsg,
    private formatDataToReturnUpdate = FormatDataClientToReturnUpdate,
    private formatDataToReturnStore = FormatDataClientToReturnStore,
    private formatDataToReturnIndex = FormatDataClientToReturnIndex,
    private formatDataToReturnShow = FormatDataClientToReturnShow,
    private db = Database,
  ) {}

  public async store({
    request,
    response,
  }: HttpContextContract): Promise<void | ClientDTO> {

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

      // Formata os dados para retornar      
      const dataClient = this.formatDataToReturnStore(client, data).data;
      
      response.status(201)

      return { data: dataClient };
  
    } catch (err) {

      await trx.rollback(); // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
        error: err.message,
      });
    }
  }

  public async index({
    response,
  }: HttpContextContract): Promise<void | ClientIndexDTO> {
    try {
      
      const clients = await this.db.query().select('*').from('clients').join('phones', 'clients.id', 'phones.client_id');

      const data = this.formatDataToReturnIndex(clients);

      response.status(200);

      return { data }

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
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

      // Obtém os dados do cliente
      const getClient = await this.clientModel.find(params.id);
  
      // Verifica se o cliente existe
      if (!getClient) return response.status(404).json(this.returnDefaultMsg.clientNotFound);

      const getAddress = await this.addressModel.findBy('client_id', params.id);

      const getPhone = await this.phoneModel.findBy('client_id', params.id);

      // Parâmetros para buscar as vendas do cliente por mês e ano
      const { month, year } = request.qs();

      // Adiciona o filtro de mês e ano se existir
      const salesFilter = this.db.query().select('*').from('sales').where('client_id', params.id);

      if (month && year) {
        salesFilter.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year]);
      } else if (month) {
        salesFilter.whereRaw('MONTH(created_at) = ?', [month]);
      } else if (year) {
        salesFilter.whereRaw('YEAR(created_at) = ?', [year]);
      }

      const getSales = await Promise.all(
        (await salesFilter).map(async (sale) => {
          const product = await this.productModel.find(sale.product_id);
          return {
            productName: product?.name,
            description: product?.description,
            brand: product?.brand,
            quantity: sale.quantity,
            unityPrice: sale.unity_price,
            totalPrice: sale.total_price,
            saleDate: new Date(sale.created_at).toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
             }
            ),
            thumbnail: product?.thumbnail,
          };
        })
      );

      // Formata os dados para retornar
      const data = this.formatDataToReturnShow({ getClient, getAddress, getPhone, getSales }).data;
      
      response.status(200);    
      
      return {
        data
      };
    } catch (err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
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
      
      const { name, email, phone, cpf, address } = request.body();

      // Busca o cliente, endereço e telefone no banco de dados
      const client = await this.clientModel.find(params.id);
      const addressClient = await this.addressModel.findBy('client_id', params.id);
      const phoneClient = await this.phoneModel.findBy('client_id', params.id);
     
      if (!client || !addressClient || !phoneClient) {
        await trx.rollback();  // Reverte a transação se não encontrar
        return response.status(404).json(this.returnDefaultMsg.clientNotFound);
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

      const responseData = this.formatDataToReturnUpdate({ client: client , phone: phoneClient, address: addressClient });

      response.status(200);

      return { data: responseData };

    } catch (err) {
      await trx.rollback();  // Reverte a transação em caso de erro
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
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

      if (!client) return response.status(404).json(this.returnDefaultMsg.clientNotFound);

      await client.delete();

      response.status(204);
      return;

    } catch(err) {
      return response.internalServerError({
        ...this.returnDefaultMsg.serverError,
        error: err.message,
      });
    }
  }
}