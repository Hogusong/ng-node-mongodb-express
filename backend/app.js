const express = require('express');

const app = express();

// Set middlewares
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { id: '1', title: 'First post', content: 'This is comming from server'},
    { id: '2', title: 'Second post', content: 'This is comming from server. Wow!'},
    { id: '3', title: 'Third post', content: 'This is comming from server. Wonderful'}
  ]
  res.status(200).json({
    message: 'Posts fetch successfully',
    posts: posts
  });
});

module.exports = app;
