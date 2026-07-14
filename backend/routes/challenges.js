const express = require('express');
const Challenge = require('../models/Challenge');
const { getDb, requireFaculty } = require('../server');
const router = express.Router();

function model() { return new Challenge(getDb()); }
function required(value) { return typeof value === 'string' && value.trim(); }
function validateChallenge(req, res, next) {
  const { title, description, difficulty } = req.body || {};
  if (!required(title) || !required(description) || !required(difficulty)) {
    return res.status(400).json({ error: 'Title, description and difficulty are required' });
  }
  next();
}

router.get('/', async (req, res, next) => {
  try { res.json(await model().findAll()); } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await model().findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
    res.json(challenge);
  } catch (error) { next(error); }
});
router.post('/', requireFaculty, validateChallenge, async (req, res, next) => {
  try { const result = await model().create(req.body); res.status(201).json({ id: result.insertedId }); } catch (error) { next(error); }
});
router.put('/:id', requireFaculty, validateChallenge, async (req, res, next) => {
  try { const result = await model().update(req.params.id, req.body); res.json({ modifiedCount: result.modifiedCount }); } catch (error) { next(error); }
});
router.delete('/:id', requireFaculty, async (req, res, next) => {
  try { const result = await model().delete(req.params.id); res.json({ deletedCount: result.deletedCount }); } catch (error) { next(error); }
});
module.exports = router;
