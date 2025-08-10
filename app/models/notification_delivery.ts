import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Notification from './notification.js'
import Template from './template.js'
import AttributeValue from './attribute_value.js'
import NotificationDeliveryStatus from '../enums/NotificationDeliveryStatus.js'

export default class NotificationDelivery extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare notificationId: number

  @belongsTo(() => Notification)
  declare notification: BelongsTo<typeof Notification>

  @column()
  declare templateId: number

  @belongsTo(() => Template)
  declare template: BelongsTo<typeof Template>

  @column()
  declare status: NotificationDeliveryStatus

  @column()
  declare failReason: string | null

  @hasMany(() => AttributeValue)
  declare attributeValues: HasMany<typeof AttributeValue>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
