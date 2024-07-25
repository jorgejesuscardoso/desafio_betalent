import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class ClientSeeder extends BaseSeeder {
  public async run () {
    await Client.createMany([
      {
        name: 'Joãozinho da Silva',
        email: 'john.silva@mail.com',
        phone: '11 9 9999-9999',
        cpf: '480.189.770-38', // Fake, generated by https://www.4devs.com.br/gerador_de_cpf 
      },
      {
        name: 'Mariazinha da Silva',
        email: 'mary.silva@mail.com',
        phone: '11 9 9999-9998',
        cpf: '316.300.180-74', // Fake, generated by https://www.4devs.com.br/gerador_de_cpf
      },
      {
        name: 'Zequinha da Silva',
        email: 'zack.silva@mail.com',
        phone: '11 9 9999-9997',
        cpf: '580.922.130-03', // Fake, generated by https://www.4devs.com.br/gerador_de_cpf
      },
      {
        name: 'Joaquim da Silva',
        email: 'joa.silva@mail.com',
        phone: '11 9 9999-9996',
        cpf: '707.292.300-40', // Fake, generated by https://www.4devs.com.br/gerador_de_cpf
      },
      {
        name: 'Mateus da Silva',
        email: 'mat.silva@mail.com',
        phone: '11 9 9999-9995',
        cpf: '632.312.500-06', // Fake, generated by https://www.4devs.com.br/gerador_de_cpf
      },
    ])
  }
}
