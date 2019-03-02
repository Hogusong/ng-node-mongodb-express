const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  imagePath: { type: String, require: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'USER', require: true }
});

module.exports = mongoose.model('POST', postSchema);