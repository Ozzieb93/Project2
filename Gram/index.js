const express         = require('express');
const app             = express();
const port            = process.env.PORT || 3000;
const expressLayouts  = require('express-ejs-layouts');
const routes          = require('./config/routes');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
// const {port, databaseURI} = require('./config/environment');

mongoose.Promise      = require('bluebird');


app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/user');

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);


app.get('/', (req, res) => res.render('pages/home'));
app.get('/login', (req, res) => res.render('auth/login'));
// app.get('/photos', (req, res) => res.render({ photos }));

app.listen(port, () => console.log(`Up running on port ${port} :)`));
