'use strict';

const _ = require('lodash');
const server = require('../server');
const User = require('../models/user');
const Company = require('../models/company');
const Feedback = require('../models/feedback');

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

// server.get('/item', item.list);
// server.post('/item', item.add);
// server.post('/item/:id', item.addChild);
// server.del('/item/:id', item.remove);
// server.get('/item/:id', item.get);
// server.put('/item/:id', item.update);

// var types = [
//   'item',
//   'text',
//   'image',
//   'html',
//   'relation',
//   'file'
// ];

//
// module.exports = {
//   /**
//    * list all available items starting from the beginning of hierarchy
//    * @param  {[type]}   req  [description]
//    * @param  {[type]}   res  [description]
//    * @param  {Function} next [description]
//    * @return {[type]}        [description]
//    */
//   list: function (req, res, next) {
//     User.findAll({
//       hierarchy: true,
//     }).then(function (model) {
//       res.send(200, model);
//     }).catch(function(error) {
//       res.send(500, error);
//     });
//   },
//
//   /**
//    * get single item with its children
//    * @param  {[type]}   req  [description]
//    * @param  {[type]}   res  [description]
//    * @param  {Function} next [description]
//    * @return {[type]}        [description]
//    */
//   get: function (req, res, next) {
//     User.find({
//       hierarchy: true,
//       where: {
//         id: req.params.id
//       }
//     }).then(function (model) {
//       res.send(200, model);
//     }).catch(function(error) {
//       res.send(500, error);
//     });
//   },
//
//   /**
//    * add new root item
//    * @param {[type]}   req  [description]
//    * @param {[type]}   res  [description]
//    * @param {Function} next [description]
//    */
//   add: function (req, res, next) {
//     User.create(req.body).then(function (model) {
//       User.find({
//         where: {
//           id: model.id
//         }
//       }).then(function (model) {
//         res.send(200, model);
//       });
//     }, function (error) {
//       console.log(error);
//       res.send(500, {message: 'User was not added'});
//     });
//   },
//
//   /**
//    * remove an item
//    * @param  {[type]}   req  [description]
//    * @param  {[type]}   res  [description]
//    * @param  {Function} next [description]
//    * @return {[type]}        [description]
//    */
//   remove: function (req, res, next) {
//     User.find({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (model) {
//
//       if (model) {
//         model.destroy().then(function (response) {
//           res.send(200, response);
//         }, function (error) {
//           console.log(error);
//           res.send(500, {message: 'User has children'});
//         });
//       } else {
//         res.send(404, {message: 'User not found'});
//       }
//     });
//   },
//
//   /**
//    * add child to an item
//    * @param  {[type]}   req  [description]
//    * @param  {[type]}   res  [description]
//    * @param  {Function} next [description]
//    * @return {[type]}        [description]
//    */
//   addChild: function(req, res, next) {
//     User.find({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (model) {
//       model.createChild(req.body).then(function (child) {
//         model.addChild(child).then(function () {
//           res.send(200, child);
//         }, function(error) {
//           console.log(error);
//           res.send(500, {message: 'Child was not created'});
//         });
//       }, function(error) {
//         console.log(error);
//         res.send(500, {message: 'Child was not created'});
//       });
//     }, function(error) {
//       console.log(error);
//       res.send(404, {message: 'Not found'});
//     });
//   },
//
//   /**
//    * update item with its children
//    * @param  {[type]}   req  [description]
//    * @param  {[type]}   res  [description]
//    * @param  {Function} next [description]
//    * @return {[type]}        [description]
//    */
//   update: function(req, res, next){
//     var updated = req.body;
//
//     User.find({
//       where: {
//         id: req.params.id
//       },
//       include: [
//         {
//           model: User,
//           as: 'descendents',
//           hierarchy: true
//         }
//       ]
//     }).then(function(model) {
//       if (model) {
//         model.update(req.body).then(function(result) {
//           res.send(200, model);
//         }, function (error) {
//           console.log(error);
//           res.send(500, {message: 'update failed'});
//         });
//       } else {
//         res.send(404, {message: 'item not found'});
//       }
//     }, function (error) {
//       console.log(error);
//       res.send(500, {message: 'something failed'});
//     });
//   }
// }
