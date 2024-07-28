import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run () {
    await Product.createMany([
      {
        name: 'Gaming Laptop',
        description: 'High-performance laptop for gaming and professional use.',
        price: 1200,
        stock: 15,
        thumbnail: 'gaming_laptop.jpg',
        brand: 'TechGuru',
        sold_quantity: 100, // Adicionando campo sold_quantity
        category: 'Computers', // Adicionando campo category
        specifications: 'Intel i7, 16GB RAM, 512GB SSD', // Adicionando campo specifications
        manufacturer: 'TechGuru Inc.', // Adicionando campo manufacturer
        status: 'Available' // Adicionando campo status
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with adjustable DPI settings.',
        price: 50,
        stock: 50,
        thumbnail: 'wireless_mouse.jpg',
        brand: 'ClickMaster',
        sold_quantity: 200,
        category: 'Accessories',
        specifications: 'Adjustable DPI, Wireless, 2 AAA batteries',
        manufacturer: 'ClickMaster Ltd.',
        status: 'Available'
      },
      {
        name: 'Bluetooth Headphones',
        description: 'Noise-canceling Bluetooth headphones with long battery life.',
        price: 150,
        stock: 30,
        thumbnail: 'bluetooth_headphones.jpg',
        brand: 'SoundWave',
        sold_quantity: 150,
        category: 'Audio',
        specifications: 'Noise-canceling, Bluetooth 5.0, 20 hours battery life',
        manufacturer: 'SoundWave Audio',
        status: 'Available'
      },
      {
        name: '4K Monitor',
        description: 'Ultra-high-definition monitor with accurate color reproduction.',
        price: 450,
        stock: 25,
        thumbnail: '4k_monitor.jpg',
        brand: 'VisionPro',
        sold_quantity: 80,
        category: 'Monitors',
        specifications: '3840x2160 resolution, 60Hz refresh rate',
        manufacturer: 'VisionPro Electronics',
        status: 'Available'
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Durable mechanical keyboard with customizable RGB backlighting.',
        price: 100,
        stock: 40,
        thumbnail: 'mechanical_keyboard.jpg',
        brand: 'KeyForge',
        sold_quantity: 120,
        category: 'Accessories',
        specifications: 'Mechanical switches, RGB backlighting, Full-size layout',
        manufacturer: 'KeyForge Tech',
        status: 'Available'
      },
      {
        name: 'Smartwatch',
        description: 'Feature-packed smartwatch with fitness tracking and notifications.',
        price: 200,
        stock: 20,
        thumbnail: 'smartwatch.jpg',
        brand: 'TimeMaster',
        sold_quantity: 60,
        category: 'Wearables',
        specifications: 'Fitness tracking, Heart rate monitor, Notifications',
        manufacturer: 'TimeMaster Innovations',
        status: 'Available'
      },
      {
        name: 'External SSD',
        description: 'High-speed external SSD for data storage and transfer.',
        price: 250,
        stock: 35,
        thumbnail: 'external_ssd.jpg',
        brand: 'DataDrive',
        sold_quantity: 90,
        category: 'Storage',
        specifications: '1TB capacity, USB 3.1, 500MB/s read speed',
        manufacturer: 'DataDrive Corp.',
        status: 'Available'
      },
      {
        name: 'Desk Lamp',
        description: 'Adjustable desk lamp with multiple light settings and USB port.',
        price: 60,
        stock: 45,
        thumbnail: 'desk_lamp.jpg',
        brand: 'LightUp',
        sold_quantity: 110,
        category: 'Furniture',
        specifications: 'Adjustable brightness, USB charging port',
        manufacturer: 'LightUp Home',
        status: 'Available'
      },
      {
        name: 'Ergonomic Chair',
        description: 'Comfortable ergonomic chair with lumbar support and adjustable height.',
        price: 300,
        stock: 10,
        thumbnail: 'ergonomic_chair.jpg',
        brand: 'ComfortSeater',
        sold_quantity: 40,
        category: 'Furniture',
        specifications: 'Lumbar support, Adjustable height, Reclining feature',
        manufacturer: 'ComfortSeater Ltd.',
        status: 'Available'
      },
      {
        name: 'USB Hub',
        description: 'Compact USB hub with multiple ports for easy connectivity.',
        price: 30,
        stock: 60,
        thumbnail: 'usb_hub.jpg',
        brand: 'HubLink',
        sold_quantity: 180,
        category: 'Accessories',
        specifications: '4 USB ports, Compact design',
        manufacturer: 'HubLink Electronics',
        status: 'Available'
      },
      {
        name: 'Portable Speaker',
        description: 'Compact portable speaker with powerful sound and Bluetooth connectivity.',
        price: 80,
        stock: 55,
        thumbnail: 'portable_speaker.jpg',
        brand: 'SoundBlast',
        sold_quantity: 140,
        category: 'Audio',
        specifications: 'Bluetooth 4.2, 10 hours battery life, Waterproof',
        manufacturer: 'SoundBlast Audio',
        status: 'Available'
      },
      {
        name: 'Webcam HD',
        description: 'High-definition webcam for clear video calls and streaming.',
        price: 70,
        stock: 70,
        thumbnail: 'webcam_hd.jpg',
        brand: 'ClearView',
        sold_quantity: 220,
        category: 'Accessories',
        specifications: '1080p HD resolution, Built-in microphone',
        manufacturer: 'ClearView Tech',
        status: 'Available'
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable laptop stand to improve ergonomics and cooling.',
        price: 40,
        stock: 65,
        thumbnail: 'laptop_stand.jpg',
        brand: 'ElevateTech',
        sold_quantity: 130,
        category: 'Accessories',
        specifications: 'Adjustable height, Ergonomic design',
        manufacturer: 'ElevateTech Solutions',
        status: 'Available'
      },
      {
        name: 'Keyboard Cover',
        description: 'Silicone keyboard cover to protect against spills and dust.',
        price: 20,
        stock: 80,
        thumbnail: 'keyboard_cover.jpg',
        brand: 'ShieldGuard',
        sold_quantity: 250,
        category: 'Accessories',
        specifications: 'Silicone material, Easy to clean',
        manufacturer: 'ShieldGuard Inc.',
        status: 'Available'
      },
      {
        name: 'Gaming Chair',
        description: 'High-back gaming chair with reclining feature and adjustable armrests.',
        price: 350,
        stock: 5,
        thumbnail: 'gaming_chair.jpg',
        brand: 'GameKing',
        sold_quantity: 15,
        category: 'Furniture',
        specifications: 'Reclining feature, Adjustable armrests, High-back design',
        manufacturer: 'GameKing Chairs',
        status: 'Available'
      },
      {
        name: 'Wireless Charger',
        description: 'Fast wireless charger for smartphones and other devices.',
        price: 25,
        stock: 75,
        thumbnail: 'wireless_charger.jpg',
        brand: 'ChargePro',
        sold_quantity: 200,
        category: 'Accessories',
        specifications: 'Fast charging, Compatible with Qi-enabled devices',
        manufacturer: 'ChargePro Tech',
        status: 'Discontinued', // Adicionado status como descontinuado
        is_deleted: true // Marcado como excluído
      }
    ])
  }
}
