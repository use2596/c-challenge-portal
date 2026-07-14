const crypto = require('crypto');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const sessions = new Map();
let client;
let db;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function getDb() {
  if (!db) throw new Error('Database is not connected');
  return db;
}

function requireFaculty(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  const session = token && sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Faculty login required' });
  }
  req.faculty = session.username;
  next();
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  const expectedUser = process.env.FACULTY_USERNAME;
  const expectedPassword = process.env.FACULTY_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return res.status(503).json({ error: 'Faculty credentials are not configured on the server' });
  }
  if (username !== expectedUser || password !== expectedPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { username, expiresAt: Date.now() + 8 * 60 * 60 * 1000 });
  res.json({ token, username, expiresIn: 8 * 60 * 60 });
});

app.post('/api/auth/logout', requireFaculty, (req, res) => {
  sessions.delete(req.headers.authorization.replace(/^Bearer\s+/i, ''));
  res.status(204).end();
});

// Export before loading route modules so they can access the live database getter.
module.exports = { getDb, requireFaculty };
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/submissions', require('./routes/submissions'));

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', db: db ? 'Connected' : 'Disconnected' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected server error' });
});

async function start() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing. Add it to backend/.env');
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || 'challenge_portal');
  await db.command({ ping: 1 });
  app.listen(PORT, () => console.log(`Challenge Portal running at http://localhost:${PORT}`));
}

start().catch((error) => {
  console.error(`Could not start server: ${error.message}`);
  process.exit(1);
});

process.on('SIGINT', async () => {
  if (client) await client.close();
  process.exit(0);
});
