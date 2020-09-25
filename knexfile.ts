import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'imdb',
        password : 'imdb',
        database : 'imdb'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
};