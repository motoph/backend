exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.boolean('admin').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
    .createTable('drivers', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').notNull();
      table.string('license_number').unique().notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
    .createTable('riders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').notNull();
      table.integer('phone_number').unique().notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('riders')
    .dropTable('drivers')
    .dropTable('users');
};
