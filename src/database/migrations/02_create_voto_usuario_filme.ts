import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('voto_usuario_filme', table =>{
        table.increments('id').primary();
        table.integer('usuario_id')
            .notNullable()
            .references('id')
            .inTable('usuario')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
        
        table.integer('filme_id')
            .notNullable()
            .references('id')
            .inTable('filme')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        
        table.integer('voto')
            .nullable()
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('voto_usuario_filme');
}