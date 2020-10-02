import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('filme', table =>{
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.integer('ano').notNullable();
        table.timestamp('tempo_duracao').notNullable();
        table.string('enredo').notNullable();
        table.string('escritores').notNullable();
        table.string('diretor').notNullable();
        table.string('genero').notNullable();
        table.string('atores').notNullable();

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('filme');
}