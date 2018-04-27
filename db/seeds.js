const mongoose            = require('mongoose');
mongoose.Promise          = require('bluebird');

const { databaseURI }     = require('../config/environment');
mongoose.connect(databaseURI);

// const User                = require('../models/user');
const Photo               = require('../models/photo');

// User.collection.drop();
Photo.collection.drop();
//
// User
//   .create([{
//     username: 'ozzie',
//     email: 'oz@oz.com',
//     password: 'hello'
//   }])
//   .then(console.log('created'))
//   .catch(err => console.log(err))
//   .finally(()=> mongoose.connection.close());


Photo
  .create([{
    photo: 'https://metrouk2.files.wordpress.com/2017/12/893906644.jpg?w=748&h=528&crop=1',
    title: 'Oz',
    description: 'This is oz'
  }])
  .then(photos => console.log(`${photos.length}photos created`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
