const Photo = require('../models/photo');


function photosIndex(req, res){
  Photo
    .find()
    .exec() // Everything before .exec() won't be executed until .exec()
    .then(photos => {
      console.log(photos);
      res.render('photos/index', { photos });
    });
  // There is no .finally() here, because the connection to node.js is always open
}

function photosShow(req, res){
  Photo
    .findById(req.params.id) // This is only usable because we have the body-parser
    // .populate('user')
    .exec()
    .then(photos => res.render('photos/show', { photos }));
}

function photosNew(req, res) {
  res.render('photos/new', {error: null});
}

function photosCreate(req, res) {
  //req.body.user = req.currentUser; //This could also be res.locals.user, which is defined also to be user in index.js
  console.log(req.body + 'created'); // This logs the contents of the request
  Photo
  console.log('it reached here')
    .create(req.body) // Getting the entire object of the request
    .then(() => res.redirect('/photos')) // A promise is either fulfilled or not fulfilled. If it is not fulfilled, it will move onto .catch(). If it is fulfilled, it will move to the next .then()
    .catch((error) => { // Catches the validation error created in the album model (ratings is not between 1 and 5 or name is blank).
      console.log(req.body);
      if(error.name === 'ValidationError') {
        return res.badRequest('/photos/new', error.toString()); // Must be returned because everything that happens after it will terminate.
      }
    });
}

function photosEdit(req, res) {
  Photo
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('photos') // Why is this necessary here? We are not enabling the user to edit which photos are in the album.
    .exec()
    .then(album => res.render('photos/edit', {album}));
}

function photosUpdate(req, res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      photo = Object.assign(photo, req.body); // This assigns the contents of req.body to album
      return photo.save();
    })
    .then(photo => res.redirect(`/photo/${photo._id}`));
}

function photosDelete(req, res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => photo.remove())
    .then(() => res.redirect('/photo'));
}


module.exports = {
  index: photosIndex,
  show: photosShow,
  new: photosNew,
  create: photosCreate,
  edit: photosEdit,
  update: photosUpdate,
  delete: photosDelete
};
