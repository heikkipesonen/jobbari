'use strict';

const restify = require('restify');
const server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.CORS());

require('./routes')

server.use(
  function crossOrigin(req,res,next){
    res.charSet('utf-8');
    return next();
  }
);

module.exports = server;
