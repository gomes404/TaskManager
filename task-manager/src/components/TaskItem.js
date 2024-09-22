import React from 'react';

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const handleDeleteTask = () => {
    onTaskDeleted(task._id);
  };

  const handleMoveTask = (status) => {
    console.log('Attempting to update task:', task);
    onTaskUpdated(task._id, status);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <span>{task.description}</span>
      </div>
      <div className="task-actions">
        {!task.inProgress && !task.completed && (
          <button className="btn-primary" onClick={() => handleMoveTask({ inProgress: true })}>Start</button>
        )}
        {task.inProgress && (
          <button className="btn-primary" onClick={() => handleMoveTask({ completed: true, inProgress: false })}>Complete</button>
        )}
        {task.completed && (
          <button className="btn-primary" onClick={() => handleMoveTask({ completed: false, inProgress: false })}>Reopen</button>
        )}
        <button className="btn-danger" onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
