import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produto extends BaseSchema {
  protected tableName = 'produtos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.text('descricao').notNullable()
      table.decimal('preco', 10, 2).notNullable()
      table.integer('quantidade').notNullable()
      table.string('imagem').notNullable()
      table.string('marca').notNullable()
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
