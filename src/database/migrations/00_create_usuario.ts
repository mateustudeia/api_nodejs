import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('usuario', table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('usuario_desativado').notNullable();
        table.boolean('admin_desativado').notNullable();
        
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usuario');
}