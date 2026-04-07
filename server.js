require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const knowledgeRoutes = require('./routes/knowledge');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/knowledge', knowledgeRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Helpdesk API is running' });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
