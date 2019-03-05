const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

const name = process.env.MONGO_USERNAME;
const password = process.env.MONGO_ATLAS_PW;

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${name}:${password}@clustersudoku-i3wly.mongodb.net/node-ng?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed!')
  });

// Set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  // optional
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(postsRoutes);
app.use(userRoutes);

module.exports = app;
