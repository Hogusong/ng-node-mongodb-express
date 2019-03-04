const POST = require('../models/post');

exports.addPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new POST({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      post: result
    });
  })
  .catch(error => {
    res.status(500).json({ message: 'Creating a post failed!' });
  });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let fetchedPosts;
  const postQuery = POST.find();

  if (pageSize * currentPage > 0) {
    postQuery.skip(pageSize * (currentPage - 1))
             .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents.map(doc => {
      return { id: doc._id,  title: doc.title,  content: doc.content, imagePath: doc.imagePath, creator: doc.creator }
    })
    return POST.countDocuments();
  }).then(count =>{
    res.status(200).json({
      message: 'Posts fetch successfully',
      posts: fetchedPosts,
      count: count
    });
  })
  .catch(error => {
    res.status(500).json({ message: 'Fetching posts failed!' });
  });
}

exports.getPost = (req, res, next) => {
  POST.findById(req.params.id).then(data => {
    res.status(200).json(data);
  })
  .catch(error => {
    res.status(500).json({ message: 'Post not found!' });
  })
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new POST({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  POST.updateOne({ _id: post._id, creator: req.userData.userId }, post).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Updated successfully!' });
    } else {
      res.status(401).json({ message: 'Not authorized!'})
    }
  })
  .catch(error => {
    res.status(500).json({ message: 'Couldn\'t update post!' });
  });
}

exports.deletePost = (req, res, next) => {
  POST.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Deleted successfully!' });
    } else {
      res.status(401).json({ message: 'Not authorized!'})
    }
  })
  .catch(error => {
    res.status(500).json({ message: 'Couldn\'t delete post!' });
  });
}
