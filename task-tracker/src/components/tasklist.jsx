import TaskItem from './taskitem';
import '../App.css';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>🎉 No tasks found! Time to relax or add new tasks above.</p>
            </div>
        );
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                />
            ))}
        </ul>
    );
}

export default TaskList;