import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phone extends BaseSchema {
  protected tableName = 'phones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('number').notNullable()
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      table.index('client_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
