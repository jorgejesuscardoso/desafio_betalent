import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public zip_code: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public neighborhood: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
 