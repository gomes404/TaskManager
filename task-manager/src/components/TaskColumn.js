import React from 'react';
import TaskItem from './TaskItem';

function TaskColumn({ title, tasks, onTaskUpdated, onTaskDeleted }) {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
