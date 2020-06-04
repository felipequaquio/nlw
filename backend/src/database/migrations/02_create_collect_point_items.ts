import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('collect_point_items', table => {
        table.increments('id').primary();
        table.integer('collect_point_id')
            .notNullable()
            .references('id')
            .inTable('collect_points');
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('collect_point_items');
}