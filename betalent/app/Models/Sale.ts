import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Product from './Product'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public productId: number

  @column()
  public quantity: number

  @column()
  public unity_price: number

  @column()
  public total_price: number

  

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime


  // Relacionamento com a tabela de clientes e produtos
  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
