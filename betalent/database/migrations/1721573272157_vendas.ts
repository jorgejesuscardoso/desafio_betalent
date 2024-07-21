import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Venda extends BaseSchema {
  protected tableName = 'vendas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE').index()
      table.integer('produto_id').unsigned().references('id').inTable('produtos').onDelete('CASCADE').index()
      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario', 10, 2).notNullable()
      table.decimal('preco_total', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
