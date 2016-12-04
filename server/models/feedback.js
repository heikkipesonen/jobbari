'use strict';

const db = require('../db');
const Sequelize = require('sequelize');

const Feedback = db.define('feedback', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  rating: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: true
});

module.exports = Feedback;
