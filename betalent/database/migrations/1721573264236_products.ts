import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Product extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('descript').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('quantity').notNullable()
      table.string('image').notNullable()
      table.string('brand').notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
