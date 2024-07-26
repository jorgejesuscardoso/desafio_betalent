import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
  public async run () {
    await Address.createMany([
      {
        zip_code: '12345-678',
        street: 'Rua 1',
        number: '123',        
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        client_id: 1
      },
      {
        zip_code: '54321-876',
        street: 'Rua 1',
        number: '456',        
        neighborhood: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        client_id: 2
      },
      {
        zip_code: '98765-432',
        street: 'Rua 1',
        number: '789',        
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        client_id: 3
      },
      {
        zip_code: '56789-012',
        street: 'Rua 1',
        number: '101',        
        neighborhood: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        client_id: 4
      },
      {
        zip_code: '21098-765',
        street: 'Rua 1',
        number: '210',        
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        client_id: 5
      },
      {
        zip_code: '65432-109',
        street: 'Rua 1',
        number: '321',        
        neighborhood: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        client_id: 6
      },
      {
        zip_code: '87654-321',
        street: 'Rua 1',
        number: '432',        
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        client_id: 7
      },
      {
        zip_code: '10987-654',
        street: 'Rua 1',
        number: '543',        
        neighborhood: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        client_id: 8
      },
      {
        zip_code: '43210-987',
        street: 'Rua 1',
        number: '654',        
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        client_id: 9
      },
      {
        zip_code: '76543-210',
        street: 'Rua 1',
        number: '765',        
        neighborhood: 'Jardim',
        city: 'São Paulo',
        state: 'SP',
        client_id: 10
      }
    ])
  }
}
