const express = require('express');
const Submission = require('../models/Submission');
const { getDb, requireFaculty } = require('../server');
const router = express.Router();

function model() { return new Submission(getDb()); }
router.get('/', requireFaculty, async (req, res, next) => {
  try { res.json(await model().findAll()); } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
  const { name, roll, email, content, challengeId } = req.body || {};
  if (![name, roll, email, content, challengeId].every(v => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ error: 'Name, roll number, email, work and challenge are required' });
  }
  try { const result = await model().create(req.body); res.status(201).json({ id: result.insertedId }); } catch (error) { next(error); }
});
router.put('/:id', requireFaculty, async (req, res, next) => {
  try { const result = await model().update(req.params.id, req.body); res.json({ modifiedCount: result.modifiedCount }); } catch (error) { next(error); }
});
router.delete('/:id', requireFaculty, async (req, res, next) => {
  try { const result = await model().delete(req.params.id); res.json({ deletedCount: result.deletedCount }); } catch (error) { next(error); }
});
module.exports = router;
