import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Heart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public short_description: string

  @column()
  public satellite: string

  @column()
  public sensor: string

  @column()
  public path: number

  @column()
  public row: number

  @column()
  public thumbnail: string

  @column()
  public coordinates: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
