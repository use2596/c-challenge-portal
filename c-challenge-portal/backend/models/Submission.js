const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['code', 'text', 'image', 'pdf', 'document'], required: true },
  content: { type: String, required: true },
  fileData: { type: String },
  fileName: { type: String },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  graded: { type: Boolean, default: false },
  grade: { type: String, default: '' },
  feedback: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);