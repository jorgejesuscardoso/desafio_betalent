import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Product extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('stock').notNullable()
      table.string('thumbnail').nullable()
      table.integer('sold_quantity').defaultTo(0)
      table.string('brand').nullable()
      table.string('category').nullable()
      table.string('specifications').nullable()
      table.string('manufacturer').nullable()
      table.string('status').defaultTo('active')
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
