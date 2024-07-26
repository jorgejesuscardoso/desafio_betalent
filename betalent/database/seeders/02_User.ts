import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Jorge Cardoso',
        email: 'adm@mail.com',
        password: 'Adm123!',
        role: 'admin',
      },
      {
        name: 'Ana Nogueira',
        email: 'manager@mail.com',
        password: 'Manager123!',
        role: 'manager',
      },
      {
        name: 'José Silva',
        email: 'user@mail.com',
        password: 'User123!',
        role: 'user',
      },
      {
        name: 'Maria Oliveira',
        email: 'client@mail.com',
        password: 'Client123!',
        role: 'client',
      }
    ])
  }
}
