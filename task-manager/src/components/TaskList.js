import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../utils/taskUtils';
import { toast } from 'react-toastify';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      console.log('Fetched tasks:', fetchedTasks);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error loading tasks:', err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdated = async (taskId, updates) => {
    try {
      console.log('handleTaskUpdated called with:', { taskId, updates });
      await updateTask(taskId, updates);
      console.log('Task updated successfully');
      await loadTasks();
    } catch (error) {
      console.error('Error in handleTaskUpdated:', error);
      if (error.response && error.response.status === 404) {
        toast.error('Task not found. It may have been deleted.');
      } else if (error.response && error.response.status === 403) {
        toast.error('You are not authorized to update this task.');
      } else {
        toast.error(`Failed to update task: ${error.message}`);
      }
    }
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleNewTaskAdded = () => {
    loadTasks();
    setShowNewTaskForm(false);
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  const todoTasks = tasks.filter(task => !task.completed && !task.inProgress);
  const inProgressTasks = tasks.filter(task => !task.completed && task.inProgress);
  const doneTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      <button 
        className="new-task-button main" 
        onClick={() => setShowNewTaskForm(true)}
      >
        Create New Task
      </button>
      {showNewTaskForm && (
        <TaskForm 
          onTaskAdded={handleNewTaskAdded} 
          onCancel={() => setShowNewTaskForm(false)}
        />
      )}
      <div className="columns-container">
        <TaskColumn 
          title="To Do" 
          tasks={todoTasks} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
        <TaskColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
        <TaskColumn 
          title="Done" 
          tasks={doneTasks} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  );
}

export default TaskList;

