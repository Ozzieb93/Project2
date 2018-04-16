const mongoose        = require('mongoose');
const databaseURI     = 'mongodb://localhost/seeding-data';
const User            = ('../models/user');
mongoose.Promise      = require('bluebird');

mongoose.connect(databaseURI);

User.collection.drop();


User.create([{
  username: 'ozzie',
  email: 'oz@oz.com',
  password: 'hello'
}])
  .then(users => console.log(`${users.length} created`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
