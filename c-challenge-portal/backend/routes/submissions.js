const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Get all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ timestamp: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit work
router.post('/', async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update grade & feedback
router.put('/:id', async (req, res) => {
  try {
    const { grade, feedback, graded } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { grade, feedback, graded },
      { new: true }
    );
    res.json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete submission
router.delete('/:id', async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download all as CSV
router.get('/download', async (req, res) => {
  try {
    const submissions = await Submission.find();
    let csv = 'Name,Roll,Email,Type,Content,Timestamp,Grade,Feedback\n';
    submissions.forEach(sub => {
      csv += `"${sub.name}","${sub.roll}","${sub.email}","${sub.type}","${sub.content.replace(/"/g, '""')}","${sub.timestamp}","${sub.grade || 'N/A'}","${(sub.feedback || '').replace(/"/g, '""')}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;