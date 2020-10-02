import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('administrador', table =>{
        table.increments('id').primary();
        table.integer('usuario_id')
            .notNullable()
            .references('id')
            .inTable('usuario')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
        table.boolean('admin_desativado')
            .notNullable();
        table.dateTime('data_cadastro')
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('administrador');
}