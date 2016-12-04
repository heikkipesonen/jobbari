'use strict';

const db = require('../db');
const Sequelize = require('sequelize');

const Reference = db.define('reference', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  src: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: true
});


module.exports = Reference;
