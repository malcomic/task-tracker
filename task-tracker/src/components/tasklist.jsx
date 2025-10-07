import TaskItem from './taskitem';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    if (tasks.length === 0) {
        return<p style={{textAlign: "center"}}>No task yet</p>
    }

    return (
        <ul style={styles.list}>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggleTask={() => onToggleTask(task.id)} 
                    onDeleteTask={() => onDeleteTask(task.id)} 
                />
            ))}
        </ul>
    );
}



const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    }
};

export default TaskList;