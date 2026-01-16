require('dotenv').config();
const express = require('express');

// Initialize database (authenticate + sync are handled inside db/index.js)
require('./db');

// Routes
const routes = require('./routes/routes.js');

const app = express();
app.use(express.json());

// Mount routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
