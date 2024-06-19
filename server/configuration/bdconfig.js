const pool = require('../models/db');

async function connectToDatabase() {
pool
    .connect()
    .then(() => {
        console.log('Connected to PostGreSQL successfully');
        return pool.database;
    })
    .catch((err) => {
        console.log('Unable to connect', err);
        throw err;
    })
}

module.exports = connectToDatabase;