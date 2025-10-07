function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
      <span
        onClick={() => onToggleTask(task.id)}
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through text-gray-500" : "text-black"
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
