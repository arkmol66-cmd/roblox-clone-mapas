const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, '../../uploads/') });
const JWT_SECRET = process.env.JWT_SECRET || 'troque_isso';

// In-memory 'db' for prototype
const users = [];
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const id = users.length + 1;
  users.push({ id, username, email, password: hash });
  res.json({ ok: true, id });
});

app.post('/api/login', async (req,res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error:'invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'invalid' });
  const token = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.post('/api/upload-asset', upload.single('file'), async (req,res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'no file' });
  res.json({ ok:true, file: { originalname: file.originalname, path: file.path } });
});

app.get('/', (req,res) => res.send('Roblox-clone API (prototype)'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('API rodando na porta', PORT));
