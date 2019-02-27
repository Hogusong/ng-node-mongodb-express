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
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// work with client
app.post('/api/posts/add', (req, res, next) => {
  const post = new POST({
    title: req.body.title,  content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      id: result._id
    });
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

app.get('/api/posts/:id', (req, res, next) => {
  POST.findById(req.params.id).then(data => {
    console.log(data);
    res.status(200).json(data);
  })
});

app.delete('/api/posts/:id', (req, res, next) => {
  POST.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json(true)
  });
});

app.put("/api/posts/update", (req, res, next) => {
  const post = req.body;
  POST.updateOne({ _id: post.id }, post).then(result => {
    res.status(200).json(true);
  })
})

module.exports = app;
