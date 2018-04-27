const User = require('../models/user');


function newRoute(req, res) {
  res.render('auth/login');
}

function createRoute(req, res) { // This is creating a new session.
  User
    .findOne({email: req.body.email})
    .then((user) =>{
      // console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        console.log('not signed in');
        return res.redirect('/error');
      }
      req.session.userId = user.id;
      // console.log(req.session);
      res.redirect(`/users/${user.id}`);
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
