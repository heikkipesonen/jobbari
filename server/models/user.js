'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const Company = require('./company');
const Reference = require('./reference');
const Feedback = require('./feedback');

const hash = require('password-hash');

const User = db.define('user', {
  // type: {
  //   type: Sequelize.STRING,
  //   field: 'type',
  //   validate: {
  //     isIn: types
  //   }
  // },
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isValidEmail: function () {
        if (input.indexOf('@') === -1) {
            throw new Error('Invalid email address');
        }
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    set: function (value) {
      return this.setDataValue(hash(value));
    }
  },
  description: {
    type: Sequelize.TEXT
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
  // tags: {
  //   field: 'tags',
  //   type: Sequelize.TEXT,
  //   set: function (value) {
  //     return this.setDataValue('tags', value ? value.join(',') : '');
  //   },
  //   get: function() {
  //     var value = this.getDataValue('tags');
  //     return value ? value.split(',') : [];
  //   }
  // }
}, {
  freezeTableName: true,
  timestamps: true,
  instanceMethods: function () {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
});

User.belongsTo(Company, {foreignKey: 'companyId'});
Reference.belongsTo(User, {foreignKey: 'userId'});
Feedback.belongsTo(Company, {foreignKey: 'companyId'});
Feedback.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;
