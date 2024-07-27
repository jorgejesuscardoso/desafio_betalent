import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Phone from './Phone'
import Address from './Address';

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  // Relacionamentos
  @hasOne(() => Phone)
  public phones: HasOne<typeof Phone>;

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>;
}
