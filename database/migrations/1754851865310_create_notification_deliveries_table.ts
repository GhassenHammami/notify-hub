import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notification_deliveries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table
        .integer('template_id')
        .unsigned()
        .references('id')
        .inTable('templates')
        .onDelete('SET NULL')
      table.string('status').notNullable().defaultTo('PENDING')
      table.string('recipient').notNullable()
      table.timestamp('sent_at').nullable()
      table.string('fail_reason').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
