import knex from 'knex';

const db = knex({ 
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'imdb',
        password : 'imdb',
        database : 'imdb'
      }
});

export default db;