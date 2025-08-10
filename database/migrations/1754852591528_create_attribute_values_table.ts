import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attribute_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('notification_delivery_id')
        .unsigned()
        .references('id')
        .inTable('notification_deliveries')
        .onDelete('CASCADE')
      table
        .integer('attribute_id')
        .unsigned()
        .references('id')
        .inTable('attributes')
        .onDelete('CASCADE')

      table.string('value_string').nullable()
      table.float('value_number').nullable()
      table.timestamp('value_date').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
