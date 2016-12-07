'use strict';

require('./user');
require('./company');

const db = require('../db');
const config = require('../env');

db.sync({
  force: config.database.forceSync
});
