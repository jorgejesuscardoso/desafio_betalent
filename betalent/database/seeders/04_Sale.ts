import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sale from 'App/Models/Sale'
import { DateTime } from 'luxon'

export default class SaleSeeder extends BaseSeeder {
  public async run () {
    await Sale.createMany([
      {
        client_id: 1,
        product_id: 1,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-07-01T15:00:00'), // Exemplo de data
      },
      {
        client_id: 1,
        product_id: 2,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-07-10T10:00:00'), // Exemplo de data
      },
      {
        client_id: 1,
        product_id: 2,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-07-20T18:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 3,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-08-01T19:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 4,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2025-08-10T08:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 5,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-09-20T10:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 11,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-05-05T09:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 3,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-08-15T14:00:00'), // Exemplo de data
      },
      {
        client_id: 2,
        product_id: 15,
        quantity: 1,
        unity_price: 200,
        total_price: 200,
        created_at: DateTime.fromISO('2025-01-20T17:00:00'), // Exemplo de data
      },
      {
        client_id: 3,
        product_id: 5,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-09-01T12:00:00'), // Exemplo de data
      },
      {
        client_id: 3,
        product_id: 6,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-09-10T11:00:00'), // Exemplo de data
      },
      {
        client_id: 3,
        product_id: 7,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-09-20T16:00:00'), // Exemplo de data
      },
      {
        client_id: 4,
        product_id: 8,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-10-05T13:00:00'), // Exemplo de data
      },
      {
        client_id: 4,
        product_id: 9,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-10-15T19:00:00'), // Exemplo de data
      },
      {
        client_id: 4,
        product_id: 10,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-10-20T20:00:00'), // Exemplo de data
      },
      {
        client_id: 5,
        product_id: 12,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-11-01T21:00:00'), // Exemplo de data
      },
      {
        client_id: 5,
        product_id: 13,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-11-10T22:00:00'), // Exemplo de data
      },
      {
        client_id: 5,
        product_id: 14,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-11-20T23:00:00'), // Exemplo de data
      },
      {
        client_id: 6,
        product_id: 6,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2024-12-05T00:00:00'), // Exemplo de data
      },
      {
        client_id: 6,
        product_id: 7,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2024-12-15T01:00:00'), // Exemplo de data
      },
      {
        client_id: 6,
        product_id: 8,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2024-12-20T02:00:00'), // Exemplo de data
      },
      {
        client_id: 7,
        product_id: 9,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
        created_at: DateTime.fromISO('2025-01-01T03:00:00'), // Exemplo de data
      },
      {
        client_id: 7,
        product_id: 2,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
        created_at: DateTime.fromISO('2025-01-10T04:00:00'), // Exemplo de data
      },
      {
        client_id: 7,
        product_id: 2,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
        created_at: DateTime.fromISO('2025-01-20T05:00:00'), // Exemplo de data
      }
    ])
  }
}
