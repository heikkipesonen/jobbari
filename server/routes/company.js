'use strict';

const _ = require('lodash');
const server = require('../server');
const Company = require('../models/company');

/**
 * TODO: paging and some shit
 * @param  {[type]} '/user'  [description]
 * @param  {[type]} function (req,         res, next [description]
 * @return {[type]}          [description]
 */
server.get('/company', function (req, res, next) {
  Company.findAll().then((response) => {
    res.send(200, response);
  });
});

/**
 * @param  {[type]} '/user/:id' [description]
 * @param  {[type]} function    (req,         res, next [description]
 * @return {[type]}             [description]
 */
server.get('/company/:id', function (req, res, next) {
  Company.find({
    where: {
      id: req.params.id
    }
  }).then((response) => {
    res.send(200, response);
  });
});


/**
 * @param  {[type]} '/user'  [description]
 * @param  {[type]} function (req,         res, next [description]
 * @return {[type]}          [description]
 */
server.post('/company', function (req, res, next) {
  Company.create(req.body).then((model) => {
    return Company.find({
      where: {
        id: model.id
      }
    }).then((company) => {
      res.send(200, company);
    });
  }, (error) => {
    res.send(500, error);
  });
});


/**
 * @param  {[type]} '/user/:id' [description]
 * @param  {[type]} function    (req,         res, next [description]
 * @return {[type]}             [description]
 */
server.put('/user/:id', function (req, res, next) {
  Company.find({
    where: {
      id: req.params.id
    }
  }).then((model) => {
    return model.update(req.body).then(() => {
      res.send(200, model);
    })
  }, (error) => {
    res.send(500, error);
  });
})
