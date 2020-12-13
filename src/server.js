const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');

const port = process.env.APP_PORT || 3001;
const mongoConnectionString =
  global.__MONGO_URI__ ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/domain';

const app = express();

const logDir = './logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(
  logger('common', {
    stream: fs.createWriteStream(path.resolve(logDir, 'access.log'), {
      flags: 'a',
    }),
  })
);

app.use(logger('dev'));
// support urlencode
app.use(express.urlencoded({ extended: false }));

// Connect to Mongo DB
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // One day
  })
);

app.use(routes);
app.use(express.static(path.resolve(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log(`App launched on ${port}`);
});

module.exports = server;
