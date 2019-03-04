const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/posts');
const extractFile = require('../middleware/file');

const checkAuth = require('../middleware/check-auth');

// work with client
router.post('/api/posts/add',
  checkAuth,
  extractFile,
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
  extractFile,
  postCtrl.updatePost
);

module.exports = router;
