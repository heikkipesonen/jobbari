'use strict';

const db = require('../db');
const Sequelize = require('sequelize');

const Company = db.define('company', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validata: function (input) {
      return input.indexOf('@') > -1;
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  vatId: {
    type: Sequelize.STRING
  },
  tags: {
    field: 'tags',
    type: Sequelize.TEXT,
    set: function (value) {
      return this.setDataValue('tags', value ? value.join(',') : '');
    },
    get: function() {
      var value = this.getDataValue('tags');
      return value ? value.split(',') : [];
    }
  },
  tel: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  address: {
    type: Sequelize.STRING
  },
  postal: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: true
});

module.exports = Company;
