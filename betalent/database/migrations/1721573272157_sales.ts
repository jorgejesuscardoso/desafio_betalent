import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sale extends BaseSchema {
  protected tableName = 'sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE').index()
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE').index()
      table.integer('quantity').notNullable()
      table.decimal('unity_price', 10, 2).notNullable()
      table.decimal('total_price', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
