const mongoose = require('mongoose');
const { Schema } = mongoose;

const FIFTEEN_IN_MILISECONDS = 15 * 60 * 1000;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    priorityRank: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'low',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reminder: {
      type: Date,
      default: () => new Date(+new Date() + FIFTEEN_IN_MILISECONDS),
    },
    labels: {
      type: [String],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'projects',
      default: '63e132c89ae3da8e193ac7c9',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'comments',
    },
  },
  { timestamps: true }
);

TaskSchema.add({
  subTasks: {
    type: [TaskSchema],
    default: [],
  },
});

module.exports = mongoose.model('tasks', TaskSchema);
