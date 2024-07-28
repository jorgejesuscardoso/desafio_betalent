import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale';

export default class Product extends BaseModel {

  constructor() {
    super()
    this.thumbnail = 'https://via.placeholder.com/150';
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public stock: number

  @column()
  public thumbnail: string 

  @column()
  public brand: string

  @column()
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @hasMany(() => Sale)
  public sales: HasMany<typeof Sale>
}
