import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import NotificationDelivery from './notification_delivery.js'
import Attribute from './attribute.js'

export default class AttributeValue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare notificationDeliveryId: number

  @belongsTo(() => NotificationDelivery)
  declare notificationDelivery: BelongsTo<typeof NotificationDelivery>

  @column()
  declare attributeId: number

  @belongsTo(() => Attribute)
  declare attribute: BelongsTo<typeof Attribute>

  @column()
  declare valueString: string | null

  @column()
  declare valueNumber: number | null

  @column.dateTime()
  declare valueDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
