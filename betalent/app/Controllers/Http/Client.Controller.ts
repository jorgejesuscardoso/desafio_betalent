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
import { ReturnDefaultMsg } from 'App/Utils/returnDefaultMsg';

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
      // Validações e tratamento dos dados são feitos no middleware.
      const requestData = request.only(['email', 'phone', 'cpf', 'name', 'address']);
  
      const toClientTable = {
        name: requestData.name,
        email: requestData.email,
        cpf: requestData.cpf,
      };
  
      // Cria um novo cliente usando a transação
      const clientMainData = await this.clientModel.create(toClientTable, { client: trx });
  
      const toPhoneTable = {
        number: requestData.phone,
        client_id: clientMainData.id,
      };
  
      // Cria um novo telefone usando a transação
      await this.phoneModel.create(toPhoneTable, { client: trx });
  
      const toAddressTable = {
        ...requestData.address,
        client_id: clientMainData.id,
      };
  
      // Cria um novo endereço usando a transação
      await this.addressModel.create(toAddressTable, { client: trx });
  
      await trx.commit(); // Confirma a transação se todas as operações forem bem-sucedidas

      // Formata os dados para retornar      
      const clientDataFormated = this.formatDataToReturnStore(clientMainData, requestData).data;
      
      response.status(201);

      return { data: clientDataFormated };
  
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

      // Aplicando eager loading para trazer os telefones      
      const clients = await this.clientModel
      .query()
      .preload('phones')
      .orderBy('id', 'asc');

      const data = this.formatDataToReturnIndex(clients);

      response.status(200);
      return { data };

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

      // Adiciona o filtro de mês e ano se existir as query params
      const salesFilter = this.db.query().select('*').from('sales').where('client_id', +params.id).orderBy('created_at', 'desc');

      if (month && year) {
        salesFilter.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year]);
      } else if (month) {
        salesFilter.whereRaw('MONTH(created_at) = ?', [month]);
      } else if (year) {
        salesFilter.whereRaw('YEAR(created_at) = ?', [year]);
      }

      const getSales = await Promise.all(
        (await salesFilter).map(async (sale) => {
          const product = await this.productModel.find(sale.product_id)
          return {
            saleId: sale.id,
            productId: product?.id,
            productName: product?.name,
            description: product?.description,
            brand: product?.brand,
            quantity: sale.quantity,
            unityPrice: sale.unity_price,
            totalPrice: sale.total_price,
            saleDate: sale.created_at
            .toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'long' }),
            thumbnail: product?.thumbnail,
          };
        })
      );

      // Formata os dados para retornar
      const data = this.formatDataToReturnShow({ getClient, getAddress, getPhone, getSales }).data;
      
      response.status(200);    
      
      return { data };
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
      // Validações e tratamento dos dados são feitos no middleware.
      
      const { name, email, phone, cpf, address } = request.body();

      // Busca o cliente, endereço e telefone no banco de dados
      const getClient = await this.clientModel.find(params.id);
      const getClientAddress = await this.addressModel.findBy('client_id', params.id);
      const getClientPhone = await this.phoneModel.findBy('client_id', params.id);
     
      if (!getClient || !getClientAddress || !getClientPhone) {
        await trx.rollback();  // Reverte a transação se não encontrar
        return response.status(404).json(this.returnDefaultMsg.clientNotFound);
      }

      // Dados a serem atualizados na tabela de clientes
      const clientMainData = {
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

      getClient.merge(clientMainData);
      await getClient.save();

      getClientAddress.merge(addressData);
      await getClientAddress.save();

      getClientPhone.merge({ number: phone || getClientPhone.number });
      await getClientPhone.save();

      // Confirma a transação
      await trx.commit();

      const responseData = this.formatDataToReturnUpdate({ client: getClient , phone: getClientPhone, address: getClientAddress });

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