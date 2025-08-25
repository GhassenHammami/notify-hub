import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Project from './project.js'
import Template from './template.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import NotificationDelivery from './notification_delivery.js'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare title: string

  @column()
  declare externalId: string | null

  @hasMany(() => Template)
  declare templates: HasMany<typeof Template>

  @hasMany(() => NotificationDelivery)
  declare notificationDeliveries: HasMany<typeof NotificationDelivery>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true, autoCreate: true })
  declare updatedAt: DateTime
}
