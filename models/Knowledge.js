const mongoose = require('mongoose');

const KnowledgeSchema = new mongoose.Schema({
  inquiry: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  saveTo: {
    type: String,
    default: 'General',
  },
  expiration: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'To Do',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Knowledge', KnowledgeSchema);
