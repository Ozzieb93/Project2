const express    = require('express');
const router     = express.Router();
const users = require('../controllers/users');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');


router.get('/', (req, res) => res.render('pages/home'));

// router.get('/login', (req, res) => res.render('auth/login'));

// Users - Show the Users

router.route('/users')
  .get(users.index);

router.route('/users/:id');  

// router.route('/users/:id')
//   .get(users.show)
//   .delete(users.delete)
//   .put(users.update);

// Authentication begin

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
