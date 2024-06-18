const client = require('../models/db');

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