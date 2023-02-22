const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comments', CommentSchema);
