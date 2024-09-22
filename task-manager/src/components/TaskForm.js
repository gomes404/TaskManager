import React, { useState } from 'react';
import { createTask } from '../utils/taskUtils';
import { toast } from 'react-toastify';

function TaskForm({ onTaskAdded, onCancel }) {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('Task description cannot be empty');
      return;
    }
    try {
      await createTask({ description });
      setDescription('');
      onTaskAdded();
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <div className="task-form-overlay">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <div className="form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
