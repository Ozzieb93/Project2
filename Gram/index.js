const express         = require('express');
const app             = express();
const port            = process.env.PORT || 3000;
const expressLayouts  = require('express-ejs-layouts');
const router          = require('router');
const mongoose = require('mongoose');


app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/user-app');

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(router);



app.get('/', (req, res) => res.render('pages/home'));
app.get('/login', (req, res) => res.render('auth/login'));
app.get('/register', (req, res) => res.render('auth/register'));
// app.get('/photos', (req, res) => res.render({ photos }));

app.listen(port, () => console.log(`Up running on port ${port} :)`));
