const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  coverImage: { type: String, default: '' },
  readTime: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
