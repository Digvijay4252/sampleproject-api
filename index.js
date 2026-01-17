require('dotenv').config();
const express = require('express');
const db = require('./db');
const routes = require('./routes/routes.js');

const app = express();
app.use(express.json());

// Mount routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server running 🚀');
});

const PORT = process.env.PORT || 3000;

// Initialize database, then start server
(async () => {
  try {
    await db.initializeDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();
