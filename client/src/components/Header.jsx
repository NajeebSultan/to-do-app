function Header({ completedCount, totalCount, onAddTask }) {
    return (
        <header className="header">
            <div className="logo">
                <div className="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white" />
                    </svg>
                </div>
                <h1>Praxis</h1>
            </div>
            <div className="header-right">
                <div className="task-counter">
                    <span>{completedCount}</span> / <span>{totalCount}</span> tasks
                </div>
                <button className="btn-add-task" onClick={onAddTask}>
                    <span>+</span> Add Task
                </button>
            </div>
        </header>
    );
}

export default Header;
