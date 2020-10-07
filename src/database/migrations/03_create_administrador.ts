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
        table.dateTime('data_cadastro')
                .notNullable();
        table.boolean('admin_desativado')
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('administrador');
}