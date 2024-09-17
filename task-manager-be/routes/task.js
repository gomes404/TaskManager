import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get tasks for a user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new task
router.post('/', auth, async (req, res) => {
  const { description } = req.body;
  try {
    const task = new Task({
      userId: req.user.userId,
      description,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
