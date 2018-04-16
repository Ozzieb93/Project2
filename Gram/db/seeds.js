const mongoose            = require('mongoose');
mongoose.Promise          = require('bluebird');

const { databaseURI }     = require('../config/environment');
mongoose.connect(databaseURI);

const User                = require('../models/user');

User.collection.drop();

User
  .create([{
    username: 'ozzie',
    email: 'oz@oz.com',
    password: 'hello'
  }])
  .then(console.log('created'))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
//
// Photo
// .create([{
//   username: ""
// }])
