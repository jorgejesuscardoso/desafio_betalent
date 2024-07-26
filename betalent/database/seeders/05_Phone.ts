import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Phone from 'App/Models/Phone'

export default class PhoneSeeder extends BaseSeeder {
  public async run () {
    await Phone.createMany([
      {
        number: '11 9 1234-5678',
        client_id: 1
      },
      {
        number: '11 9 8765-4321',
        client_id: 2
      },
      {
        number: '11 9 9876-5432',
        client_id: 3
      },
      {
        number: '11 9 2345-6789',
        client_id: 4
      },
      {
        number: '11 9 8765-4321',
        client_id: 5
      },
      {
        number: '11 9 6543-2109',
        client_id: 6
      },
      {
        number: '11 9 1234-5678',
        client_id: 7
      },
      {
        number: '11 9 8765-4321',
        client_id: 8
      },
      {
        number: '11 9 9876-5432',
        client_id: 9
      },
      {
        number: '11 9 2345-6789',
        client_id: 10
      }
    ])
  }
}
