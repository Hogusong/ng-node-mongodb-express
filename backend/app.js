const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: 1, title: 'First post', content: 'This is comming from server'},
    { id: 2, title: 'Second post', content: 'This is comming from server. Wow!'},
    { id: 3, title: 'Third post', content: 'This is comming from server. Wonderful'}
  ]
  res.status(200).json({
    message: 'Posts fetch successfully',
    posts: posts
  });
});

module.exports = app;
