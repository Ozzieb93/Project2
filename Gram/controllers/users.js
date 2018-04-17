// The controller talks between the router and the view
// The name of the file for a controller is always plural

const User = require('../models/user');

function usersIndex(req, res){
  User
    .find()
    .exec() // Everything before .exec() won't be executed until .exec()
    .then(users => {
      res.render('users/index', {users});
    });
  // There is no .finally() here, because the connection to node.js is always open
}

function usersShow(req, res){
  User
    .findById(req.params.id) // This is only usable because we have the body-parser
    // .populate('photos')
    .exec()
    .then(users => res.render('users/show', {users}));
}


//
module.exports = {
  index: usersIndex,
  show: usersShow

//   delete: albumsDelete,
//   new: albumsNew,
//   create: albumsCreate,
//   edit: albumsEdit,
//   update: albumsUpdate
};
