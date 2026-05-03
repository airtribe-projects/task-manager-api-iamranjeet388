console.log("STARTING SERVER...");
const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

// routes
app.use('/tasks', taskRoutes);

// default route
app.get('/', (req, res) => {
  res.send('API running...');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});