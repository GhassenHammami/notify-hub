import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Notification from './notification.js'
import Template from './template.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare apiKey: string

  @column({
    consume: (value: number) => Boolean(value),
  })
  declare isActive: boolean

  @column({
    consume: (value: number) => Boolean(value),
  })
  declare isDefault: boolean

  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  @hasMany(() => Template)
  declare templates: HasMany<typeof Template>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime

  static async setAsDefault(projectId: number, userId: number): Promise<void> {
    await this.transaction(async (trx) => {
      await this.query({ client: trx }).where('userId', userId).update({ isDefault: false })

      await this.query({ client: trx })
        .where('id', projectId)
        .where('userId', userId)
        .update({ isDefault: true })
    })
  }

  static async getDefaultProject(userId: number): Promise<Project | null> {
    return await this.query().where('userId', userId).where('isDefault', true).first()
  }

  static async unsetDefault(userId: number): Promise<void> {
    await this.query().where('userId', userId).update({ isDefault: false })
  }
}
