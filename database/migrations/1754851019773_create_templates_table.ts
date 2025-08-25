import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'templates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('notification_id')
        .unsigned()
        .references('id')
        .inTable('notifications')
        .onDelete('CASCADE')
        .notNullable()
      table.string('channel').notNullable()
      table.text('content').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()

      table.unique(['notification_id', 'channel'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
