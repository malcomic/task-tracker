import React from "react";
import { useState } from "react";
import '../App.css';

function TaskForm({ onAddTask }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        onAddTask(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="✨ What amazing thing will you accomplish today?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="task-input"
                />
                <button 
                    type="submit" 
                    className="task-button"
                    disabled={!text.trim()}
                >
                    🚀 Add Task
                </button>
            </div>
        </form>
    );
}

export default TaskForm;