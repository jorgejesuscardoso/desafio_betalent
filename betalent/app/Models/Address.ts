import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client';

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public zipCode: string;

  @column()
  public street: string;

  @column()
  public number: string;

  @column()
  public neighborhoods: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public clientId: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  // Relacionamentos
  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;
}
 