import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('filme', table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('nome_diretor').notNullable();
        table.string('genero').notNullable();
        table.string('atores').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('filme');
}