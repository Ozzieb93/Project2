const mongoose  = require('mongoose');
mongoose.Promise   = require('bluebird');

const photoSchema = new mongoose.Schema({
  photo: {type: String, required: true, unique: true},
  title: {type: String, required: true },
  description: {type: String, required: true}
  // user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Photo', photoSchema);
