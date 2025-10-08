import { useState } from 'react';
import '../App.css';

function TaskItem({ task, onToggleTask, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEditTask(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div 
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleTask(task.id)}
        >
          {task.completed && '✓'}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={handleKeyPress}
            className="edit-input"
            autoFocus
          />
        ) : (
          <span 
            className={`task-text ${task.completed ? 'completed' : ''}`}
            onDoubleClick={() => !task.completed && setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button 
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            aria-label="Edit task"
          >
            ✏️
          </button>
        )}
        <button 
          onClick={() => onDeleteTask(task.id)}
          className="delete-btn"
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TaskItem;