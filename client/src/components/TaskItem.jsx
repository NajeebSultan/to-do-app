function TaskItem({ task, onToggleComplete, onDeleteTask }) {

    // Helper to get tag class
    const getTagClass = (category) => {
        const lowerCat = category.toLowerCase();
        return `tag tag-${lowerCat}`;
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>

            <div className="task-checkbox-wrapper">
                <div
                    className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => onToggleComplete(task._id, task.completed)}
                >
                </div>
            </div>

            <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-meta">
                    <span className={getTagClass(task.category)}>
                        {task.category}
                    </span>
                </div>
            </div>

            <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task._id);
                }}
            >
                &times;
            </button>
        </div>
    );
}

export default TaskItem;
