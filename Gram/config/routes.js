const express    = require('express');
const router     = express.Router();
const registrations = require('../controllers/registrations');

router.get('/', (req, res) => res.render('pages/home'));

// router.get('/login', (req, res) => res.render('auth/login'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

module.exports = router;
