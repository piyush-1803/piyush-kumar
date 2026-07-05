import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialGymData } from './src/data';

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

// Ensure JSON parsing support
app.use(express.json());

// Initialize/Read Database file
function getGymData() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialGymData, null, 2), 'utf-8');
      return initialGymData;
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading/writing data.json, returning initial seed data:', err);
    return initialGymData;
  }
}

// Save Database file
function saveGymData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data.json:', err);
    return false;
  }
}

// API Route: Get Gym Website Data
app.get('/api/gym-data', (req, res) => {
  const data = getGymData();
  res.json(data);
});

// API Route: Contact Form Submission
app.post('/api/contact-submit', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  if (!name || !phone || !message) {
    res.status(400).json({ success: false, error: 'Name, phone, and message are required fields.' });
    return;
  }

  const currentData = getGymData();
  const submission = {
    id: `sub-${Date.now()}`,
    name,
    email: email || '',
    phone,
    message,
    date: new Date().toISOString().split('T')[0],
    status: 'unread' as const
  };

  currentData.submissions = [submission, ...currentData.submissions];
  const saved = saveGymData(currentData);

  if (saved) {
    res.json({ success: true, submission });
  } else {
    res.status(500).json({ success: false, error: 'Database write error' });
  }
});

// API Route: Admin Authentication
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'nationalgym123';

  if (password === adminPassword) {
    // Return a dummy session token
    res.json({ success: true, token: 'nationalgym-admin-token-2026' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid administrator password.' });
  }
});

// API Route: Save Gym Website Data (Requires Admin Auth Token)
app.post('/api/gym-data', (req, res) => {
  const authHeader = req.headers.authorization;
  const expectedToken = 'Bearer nationalgym-admin-token-2026';

  if (!authHeader || authHeader !== expectedToken) {
    res.status(403).json({ success: false, error: 'Unauthorized database write attempt.' });
    return;
  }

  const newData = req.body;
  const saved = saveGymData(newData);

  if (saved) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write updated configuration to disk.' });
  }
});

// Vite Middleware integration for development vs production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`National Gym Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
