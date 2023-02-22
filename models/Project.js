const mongoose = require('mongoose');
const { Schema } = mongoose;

const PROJECT_COLORS = [
  'berry_red',
  'red',
  'orange',
  'yellow',
  'olive_green',
  'lime_green',
  'green',
  'mint_green',
  'teal',
  'sky_blue',
  'light_blue',
  'blue',
  'grape',
  'violet',
  'lavender',
  'magenta',
  'salmon',
  'charcoal',
  'grey',
  'taupe',
];

const ProjectSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  color: {
    type: String,
    enum: PROJECT_COLORS,
    default: PROJECT_COLORS.find((color) => color === 'charcoal'),
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  view: {
    type: String,
    enum: ['list', 'board'],
    default: 'list',
  },
});

module.exports = mongoose.model('projects', ProjectSchema);
