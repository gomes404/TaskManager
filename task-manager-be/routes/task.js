import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Task routes are working' });
});

// Get all tasks for a user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Add a new task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    console.log('Received update request for task ID:', req.params.id);
    console.log('User ID from auth middleware:', req.user.userId);
    console.log('Update data:', req.body);

    let task = await Task.findById(req.params.id);
    
    if (!task) {
      console.log('Task not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.userId) {
      console.log('Task found but does not belong to the user');
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    console.log('Task updated successfully:', task);
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

export default router;
