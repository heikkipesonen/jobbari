'use strict';
require('./routes')

const server = require('./server');
const config = require('./env');


server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
