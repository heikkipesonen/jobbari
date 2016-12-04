'use strict';

require('./user');

const db = require('../db');
const config = require('../env');

db.sync({
  force: config.database.forceSync
});
