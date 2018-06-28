const User = require('../models/user');

function newRoute(req, res) {
  res.render('auth/register');
}

function createRoute(req, res){
  // console.log('Before the create function',req.body);
  User
    .create(req.body)
    .then(() => {
      // console.log('here in then function');
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        return res.badRequest('signup', err.toString());
      }
    });
  // console.log('After the create function',req.body);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
