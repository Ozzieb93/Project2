const express         = require('express');
const app             = express();
const {databaseURI, port }            = require('./config/environment');
const expressLayouts  = require('express-ejs-layouts');
const routes          = require('./config/routes');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const flash           = require('flash');
const User            = require('./models/user');
const session         = require('express-session');
const customResponses = require('./lib/customResponses');
const methodOverride = require('method-override');
// const {port, databaseURI} = require('./config/environment');

mongoose.Promise      = require('bluebird');


app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

mongoose.connect(databaseURI);
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));




app.use(session({
  secret: 'my super secret token', //Sign the session ID cookie. The content of the cookie will be encrypted using this, so if you open the cookie in Chrome dev tools the contents will be gibberish.
  resave: false, // Not sure what this really does.
  saveUninitialized: false // Prevents saving sessions that are not modified. (Not sure what this really means, but magic I guess.)
}));

app.use(flash());
app.use(customResponses);


app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id; // This has been set in sessions.create in the sessions model order to store the userId on the client's machine. Here we set req.session.userId to be the same as the ID of the user's document in the database, then change the currentUser to User and set isLoggedIn to true.
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
// res contains locals, locals contains user because we put it there.
});


app.use(routes);


// app.get('/', (req, res) => res.render('pages/home'));
// app.get('/error', (req, res) => res.render('pages/error'));
// app.get('/login', (req, res) => res.render('auth/login'));
// app.get('/photos', (req, res) => res.render({ photos }));

app.listen(port, () => console.log(`Up running on port ${port} :)`));
