import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Template from './template.js'
import AttributeValue from './attribute_value.js'
import AttributeType from '../enums/attribute_type.js'

export default class Attribute extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare templateId: number

  @belongsTo(() => Template)
  declare template: BelongsTo<typeof Template>

  @column()
  declare name: string

  @column()
  declare type: AttributeType

  @column({
    consume: (value: number) => Boolean(value),
  })
  declare isRequired: boolean

  @hasMany(() => AttributeValue)
  declare attributeValues: HasMany<typeof AttributeValue>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
