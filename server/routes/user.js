'use strict';

const _ = require('lodash');
const server = require('../server');
const User = require('../models/user');
const Company = require('../models/company');
const Feedback = require('../models/feedback');

const jwt = require('jsonwebtoken');
const env = require('../env');
/**
 * list all users
 * TODO: paging and some shit
 * @param  {[type]} '/user'  [description]
 * @param  {[type]} function (req,         res, next [description]
 * @return {[type]}          [description]
 */
server.get('/user', function (req, res, next) {
  User.findAll({
    attributes: ['id', 'name', 'description'],
    include: [
      {
        model: Company
      }
    ]
  }).then((response) => {
    res.send(200, response);
  });
});

/**
 * find user by id
 * @param  {[type]} '/user/:id' [description]
 * @param  {[type]} function    (req,         res, next [description]
 * @return {[type]}             [description]
 */
server.get('/user/:id', function (req, res, next) {
  User.find({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'description'],
    include: [
      {
        model: Company
      }
    ]
  }).then((response) => {
    res.send(200, response);
  });
});


/**
 * create new user
 * @param  {[type]} '/user'  [description]
 * @param  {[type]} function (req,         res, next [description]
 * @return {[type]}          [description]
 */
server.post('/user', function (req, res, next) {
  User.create(req.body).then((model) => {
    return User.find({
      where: {
        id: model.id
      }
    }).then((user) => {
      delete user.password;
      res.send(200, user);
    });
  }, (error) => {
    res.send(500, error);
  });
});


/**
 * update user info
 * @param  {[type]} '/user/:id' [description]
 * @param  {[type]} function    (req,         res, next [description]
 * @return {[type]}             [description]
 */
server.put('/user/:id', function (req, res, next) {
  User.find({
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

/**
 * authenticate user
 */
server.post('/login', function (req, res, next) {

  console.log(req.body);

  User.find({
    where: {
      email: req.body.email
    }
  }).then((model) => {
    console.log('model', model)
     if (model && model.authenticate(req.body.password)) {
       let token = jwt.sign({
         email: model.email,
         password: model
       }, env.secret, {
         expiresIn: 60 * 60 * 24
       });

       res.send(200, {
         success: true,
         token
       });
     } else {
       res.send(500, 'kakka');
     }
  }, (error) => {
    res.send(500, error);
  });
});
