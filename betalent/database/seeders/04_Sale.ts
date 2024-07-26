import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sale from 'App/Models/Sale'

export default class SaleSeeder extends BaseSeeder {
  public async run () {
    await Sale.createMany([
      {
        client_id: 1,
        product_id: 1,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
      },
      {
        client_id: 1,
        product_id: 2,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
      },
      {
        client_id: 1,
        product_id: 2,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
      },
      {
        client_id: 2,
        product_id: 11,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
      },
      {
        client_id: 2,
        product_id: 3,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
      },
      {
        client_id: 2,
        product_id: 15,
        quantity: 1,
        unity_price: 200,
        total_price: 200,
      },
      {
        client_id: 2,
        product_id: 4,
        quantity: 1,
        unity_price: 200,
        total_price: 200,
      },
      {
        client_id: 3,
        product_id: 5,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
      },
      {
        client_id: 3,
        product_id: 13,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
      },
      {
        client_id: 3,
        product_id: 6,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
      },
      {
        client_id: 4,
        product_id: 14,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
      },
      {
        client_id: 4,
        product_id: 7,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
      },
      {
        client_id: 4,
        product_id: 8,
        quantity: 1,
        unity_price: 200,
        total_price: 200,
      },
      {
        client_id: 4,
        product_id: 9,
        quantity: 2,
        unity_price: 100,
        total_price: 200,
      },
      {
        client_id: 5,
        product_id: 10,
        quantity: 1,
        unity_price: 50,
        total_price: 50,
      },
      {
        client_id: 5,
        product_id: 11,
        quantity: 3,
        unity_price: 150,
        total_price: 450,
      },
      {
        client_id: 5,
        product_id: 12,
        quantity: 1,
        unity_price: 200,
        total_price: 200,
      }
    ]);
  }
}
