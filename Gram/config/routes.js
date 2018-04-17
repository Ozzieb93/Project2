const express         = require('express');
const router          = express.Router();
const users           = require('../controllers/users');
const photos          = require('../controllers/photos');
const registrations   = require('../controllers/registrations');
const sessions        = require('../controllers/sessions');



router.get('/', (req, res) => res.render('pages/home'));

// Photos - Show the Photos

router.route('/photos')
  .get(photos.index)
  .post(photos.create);

router.route('/photos/new')
  .get(photos.new)
  .post(photos.create);

router.route('/photos/:id')
  .get(photos.show)
  .delete(photos.delete)
  .put(photos.update);

router.route('/albums/:id/edit')
  .get(photos.edit);

// End Photos

// Users - Show the Users

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

// Users End

// Authentication Begin

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

// Authentication End

module.exports = router;
