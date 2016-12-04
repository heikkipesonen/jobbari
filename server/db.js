'use strict';
const Sequelize = require('sequelize');
const config  = require('./env');
console.log('....');
console.log(config.database.name);
console.log(config.database.user);
console.log(config.database.password);
console.log('....');
const db = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  port: config.database.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
