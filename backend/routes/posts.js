const express = require('express');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error('Invalid mime type');
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const POST = require('../models/post');

// work with client
router.post('/api/posts/add', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new POST({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
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
      return { id: doc._id,  title: doc.title,  content: doc.content, imagePath: doc.imagePath }
    })
    res.status(200).json({
      message: 'Posts fetch successfully',
      posts: posts
    });
  });
});

router.get('/api/posts/:id', (req, res, next) => {
  POST.findById(req.params.id).then(data => {
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
