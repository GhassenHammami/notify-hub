import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Notification from './notification.js'
import Channel from '#enums/channel'
import Attribute from './attribute.js'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare notificationId: number

  @column()
  declare channel: Channel

  @column()
  declare content: string

  @belongsTo(() => Notification)
  declare notification: BelongsTo<typeof Notification>

  @hasMany(() => Attribute)
  declare attributes: HasMany<typeof Attribute>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true, autoCreate: true })
  declare updatedAt: DateTime
}
