const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  description: String,
  photos: [Srting],
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;