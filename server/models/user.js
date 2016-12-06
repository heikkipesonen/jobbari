'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const Company = require('./company');
const Reference = require('./reference');
const Feedback = require('./feedback');

const hash = require('password-hash');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.VIRTUAL,
    validate: {
      len: [6, Infinity]
    }
  },
  password_confirmation: {
    type: Sequelize.VIRTUAL
  },
  password_hash: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: true,
  indexes: [{unique: true, fields: ['email']}],
  instanceMethods: {
    authenticate: function (value) {
      if (hash.verify(value, this.password_hash)) {
        return this;
      }

      return false;
    }
  }
});


var hasSecurePassword = function(user, options, callback) {
	// if (user.password != user.password_confirmation) {
	// 	throw new Error("Password confirmation doesn't match Password");
	// }

  let hashed = hash.generate(user.get('password'));
  user.set('password_hash', hashed);
  return callback(null, options);
};


User.beforeCreate((user, options, callback) => {
  user.email = user.email.toLowerCase();
  if (user.password) {
    hasSecurePassword(user, options, callback);
  } else {
    return callback(null, options);
  }
});

User.beforeUpdate((user, options, callback) => {
  user.email = user.email.toLowerCase();
  if (user.password) {
    hasSecurePassword(user, options, callback);
  } else {
    return callback(null, options);
  }
})


User.belongsTo(Company, {foreignKey: 'companyId'});
Reference.belongsTo(User, {foreignKey: 'userId'});
Feedback.belongsTo(Company, {foreignKey: 'companyId'});
Feedback.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;
