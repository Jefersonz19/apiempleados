const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: '5432',
    database: 'moduloempleados',
})

async function connectToDatabase() {
client
    .connect()
    .then(() => {
        console.log('Connected to PostGreSQL successfully');
        return client.database;
    })
    .catch((err) => {
        console.log('Unable to connect', err);
        throw err;
    })
}

module.exports = connectToDatabase;