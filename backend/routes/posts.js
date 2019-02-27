const express = require('express');

const router = express.Router();

const POST = require('../models/post');

// work with client
router.post('/api/posts/add', (req, res, next) => {
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

router.get("/api/posts", (req, res, next) => {
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

router.get('/api/posts/:id', (req, res, next) => {
  POST.findById(req.params.id).then(data => {
    console.log(data);
    res.status(200).json(data);
  })
});

router.delete('/api/posts/:id', (req, res, next) => {
  POST.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json(true)
  });
});

router.put("/api/posts/update", (req, res, next) => {
  const post = req.body;
  POST.updateOne({ _id: post.id }, post).then(result => {
    res.status(200).json(true);
  })
})

module.exports = router;

