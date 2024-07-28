import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
  public async run () {
    await Address.createMany([
      {
        zipCode: '12345-678',
        street: 'Rua 1',
        number: '123',        
        neighborhoods: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        clientId: 1
      },
      {
        zipCode: '54321-876',
        street: 'Rua 1',
        number: '456',        
        neighborhoods: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        clientId: 2
      },
      {
        zipCode: '98765-432',
        street: 'Rua 1',
        number: '789',        
        neighborhoods: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        clientId: 3
      },
      {
        zipCode: '56789-012',
        street: 'Rua 1',
        number: '101',        
        neighborhoods: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        clientId: 4
      },
      {
        zipCode: '21098-765',
        street: 'Rua 1',
        number: '210',        
        neighborhoods: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        clientId: 5
      },
      {
        zipCode: '65432-109',
        street: 'Rua 1',
        number: '321',        
        neighborhoods: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        clientId: 6
      },
      {
        zipCode: '87654-321',
        street: 'Rua 1',
        number: '432',        
        neighborhoods: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        clientId: 7
      },
      {
        zipCode: '10987-654',
        street: 'Rua 1',
        number: '543',        
        neighborhoods: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        clientId: 8
      },
      {
        zipCode: '43210-987',
        street: 'Rua 1',
        number: '654',        
        neighborhoods: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        clientId: 9
      },
      {
        zipCode: '76543-210',
        street: 'Rua 1',
        number: '765',        
        neighborhoods: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        clientId: 10
      }
    ])
  }
}
