import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hearts extends BaseSchema {
  protected tableName = 'hearts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.string('short_description', 400)
      table.decimal('latitude', 5)
      table.decimal('longitude', 5)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
