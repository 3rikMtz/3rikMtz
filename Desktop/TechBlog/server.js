// Dependencies
const express = require('express');
const routes = require('./controllers');
// Import express-handlebars
const exphbs = require('express-handlebars');
const session = require('express-session');
const hbs = exphbs.create({});
const path = require('path');
const moment = require('moment');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "secretKey",
  cookie: {
      maxAge: 600000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      visitCount: 0,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};
app.use(session(sess));

// Register the format_date helper
hbs.handlebars.registerHelper('format_date', (date) => {
  return moment(date).format('MMM DD, YYYY');
});

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
    sequelize.sync({ force: false })
});





