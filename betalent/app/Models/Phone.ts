import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public number: string;

  @column()
  public clientId: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  // Relacionamento
  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;
}
