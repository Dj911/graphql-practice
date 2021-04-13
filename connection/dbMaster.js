const mongoose = require('mongoose');

const { database,options } = require('../config/config');

const db = mongoose.createConnection(database.str,options);

// Successful Connection Events
db.on('connecting', () => {
    console.log('Connecting to Database...');
})

db.on('connected', () => {
    console.log('Connection successfully established 🎉!');
    // logger

})

db.on('reconnected', () => {
    console.log('Database Reconnected successfully...');
    // logger
})

// Unsuccessful Connections Events

db.on('error', (err) => {
    console.log('Error connecting to Database 😣');
    console.log(err.message);
    // logger with ${err}
})

db.on('disconnected', () => {
    console.log('Connection to DB lost ☹!!');
    // logger
})

module.exports = db;