import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskForm from "./components/taskform";
import TaskList from "./components/tasklist";
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = (text) => {
    const newTask = { 
      id: Date.now(), 
      text, 
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  }).filter(task => 
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="app">
      <div className="app-header">
        <h1>🎯 TaskMaster</h1>
        <p>Organize your life, one task at a time</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{tasks.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <TaskForm onAddTask={addTask} />

      <div className="controls-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            📋 All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
          >
            ⏳ Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          >
            ✅ Completed
          </button>
        </div>

        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-completed-btn">
            🗑️ Clear Completed
          </button>
        )}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />

      {tasks.length > 0 && (
        <div className="footer">
          <p>
            {activeCount} task{activeCount !== 1 ? 's' : ''} left • 
            {completedCount > 0 && ` ${completedCount} completed`}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;