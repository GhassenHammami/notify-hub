import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Notification from './notification.js'
import NotificationDelivery from './notification_delivery.js'
import Attribute from './attribute.js'
import Channel from '../enums/Channel.js'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare channel: Channel

  @column()
  declare content: string

  // A template can have many attributes
  @hasMany(() => Attribute)
  declare attributes: HasMany<typeof Attribute>

  // A template can be used by many notifications
  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  // A template can be used by many delivery attempts
  @hasMany(() => NotificationDelivery)
  declare notificationDeliveries: HasMany<typeof NotificationDelivery>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
