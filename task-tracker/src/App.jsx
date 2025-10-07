import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskForm from "./components/taskform";
import TaskList from "./components/tasklist";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
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

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-semibold text-center mb-4">Task Tracker</h1>
  <TaskForm onAddTask={addTask} />

  <div className="flex justify-center gap-2 mb-4">
    <button
      onClick={() => setFilter("all")}
      className={`px-3 py-1 rounded ${
        filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      All
    </button>
    <button
      onClick={() => setFilter("active")}
      className={`px-3 py-1 rounded ${
        filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      Active
    </button>
    <button
      onClick={() => setFilter("completed")}
      className={`px-3 py-1 rounded ${
        filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      Completed
    </button>
  </div>

  <TaskList
    tasks={filteredTasks}
    onToggleTask={toggleTask}
    onDeleteTask={deleteTask}
  />


</div>




  );
}



export default App;
