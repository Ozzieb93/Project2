const express    = require('express');
const router     = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');


router.get('/', (req, res) => res.render('pages/home'));

// router.get('/login', (req, res) => res.render('auth/login'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);


router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
