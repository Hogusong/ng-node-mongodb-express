const express = require('express');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const POST = require('../models/post');
const checkAuth = require('../middleware/check-auth');

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

const postCtrl = require('../controllers/posts')

// work with client
router.post('/api/posts/add',
  checkAuth,
  multer({ storage: storage }).single('image'),
  postCtrl.addPost
);

router.get("/api/posts", postCtrl.getPosts);

router.get('/api/posts/:id', postCtrl.getPost);

router.delete(
  '/api/posts/:id',
  checkAuth,
  postCtrl.deletePost
);

router.put(
  "/api/posts/update",
  checkAuth,
  multer({ storage: storage }).single('image'),
  postCtrl.updatePost
);

module.exports = router;
