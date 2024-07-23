import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Address extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('cep', 9).notNullable() // Considerando o CEP com hífen
      table.string('number').notNullable()
      table.string('complement')
      table.string('district').notNullable()
      table.string('city').notNullable()
      table.string('state', 2).notNullable()
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
