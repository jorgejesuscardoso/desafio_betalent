import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run () {
    await Product.createMany([
      {
        name: 'Product 1',
        description: 'Description of product 1',
        price: 100,
        stock: 10,
        image: 'product1.jpg',
        brand: 'Brand 1'
      },
      {
        name: 'Product 2',
        description: 'Description of product 2',
        price: 200,
        stock: 20,
        image: 'product2.jpg',
        brand: 'Brand 2'
      },
      {
        name: 'Product 3',
        description: 'Description of product 3',
        price: 300,
        stock: 30,
        image: 'product3.jpg',
        brand: 'Brand 3'
      },
      {
        name: 'Product 4',
        description: 'Description of product 4',
        price: 400,
        stock: 40,
        image: 'product4.jpg',
        brand: 'Brand 4'
      },
      {
        name: 'Product 5',
        description: 'Description of product 5',
        price: 500,
        stock: 50,
        image: 'product5.jpg',
        brand: 'Brand 5'
      },
      {
        name: 'Product 6',
        description: 'Description of product 6',
        price: 600,
        stock: 60,
        image: 'product6.jpg',
        brand: 'Brand 6'
      },
      {
        name: 'Product 7',
        description: 'Description of product 7',
        price: 700,
        stock: 70,
        image: 'product7.jpg',
        brand: 'Brand 7'
      },
      {
        name: 'Product 8',
        description: 'Description of product 8',
        price: 800,
        stock: 80,
        image: 'product8.jpg',
        brand: 'Brand 8'
      },
      {
        name: 'Product 9',
        description: 'Description of product 9',
        price: 900,
        stock: 90,
        image: 'product9.jpg',
        brand: 'Brand 9'
      },
      {
        name: 'Product 10',
        description: 'Description of product 10',
        price: 1000,
        stock: 100,
        image: 'product10.jpg',
        brand: 'Brand 10'
      },
      {
        name: 'Product 11',
        description: 'Description of product 11',
        price: 1100,
        stock: 110,
        image: 'product11.jpg',
        brand: 'Brand 11'
      },
      {
        name: 'Product 12',
        description: 'Description of product 12',
        price: 1200,
        stock: 120,
        image: 'product12.jpg',
        brand: 'Brand 12'
      },
      {
        name: 'Product 13',
        description: 'Description of product 13',
        price: 1300,
        stock: 130,
        image: 'product13.jpg',
        brand: 'Brand 13'
      },
      {
        name: 'Product 14',
        description: 'Description of product 14',
        price: 1400,
        stock: 140,
        image: 'product14.jpg',
        brand: 'Brand 14'
      },
      {
        name: 'Product 15',
        description: 'Description of product 15',
        price: 1500,
        stock: 150,
        image: 'product15.jpg',
        brand: 'Brand 15'
      }
    ])
  }
}
