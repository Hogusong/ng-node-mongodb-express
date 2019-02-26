const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const environment = require('./environments/environment')

const POST = require('./models/post');

const app = express();

mongoose.connect(`mongodb+srv://${environment.name}:${environment.dbpass}@clustersudoku-i3wly.mongodb.net/node-ng?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed!')
  });

// Set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  // optional

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// work with client
app.post('/api/post', (req, res, next) => {
  const post = new POST({
    title: req.body.title,  content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  POST.find().then(documents => {
    const posts = documents.map(doc => {
      return { id: doc._id,  title: doc.title,  content: doc.content }
    })
    res.status(200).json({
      message: 'Posts fetch successfully',
      posts: posts
    });
  });
});

module.exports = app;
