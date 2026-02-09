import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#9CA3AF' }}>
                <p>No tasks for today</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Tap + to add one</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </div>
    );
}

export default TaskList;
