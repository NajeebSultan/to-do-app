import { useState, useEffect } from 'react';
import api from './api/axios'; // Import configured axios instance
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import CategoryGrid from './components/CategoryGrid';
import { useAuth } from './context/AuthContext'; // Import useAuth for logout

// Remove API_URL constant as it's handled in api/axios.js

function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth(); // Get logout function

    // Get Today's Date formatted: "26 Dec"
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks'); // Use api instance and relative path
            if (Array.isArray(response.data)) {
                setTasks(response.data);
            } else {
                setTasks([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            setTasks([response.data, ...tasks]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTaskComplete = async (taskId, currentStatus) => {
        try {
            const response = await api.put(`/tasks/${taskId}`, {
                completed: !currentStatus
            });
            setTasks(tasks.map(task =>
                task._id === taskId ? response.data : task
            ));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    // Derived State for Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const categories = ['All', 'Personal', 'Work', 'Shopping', 'Health', 'Learning'];
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredTasks = activeFilter === 'All'
        ? tasks
        : tasks.filter(t => t.category === activeFilter);

    const todoTasks = filteredTasks.filter(t => !t.completed);
    const doneTasks = filteredTasks.filter(t => t.completed);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    // Icons for Filter Pills
    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'All': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            );
            case 'Personal': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
            );
            case 'Work': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            );
            case 'Shopping': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            );
            case 'Health': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            );
            case 'Learning': return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
            );
            default: return null;
        }
    };

    return (
        <div className="app-container">

            {/* Header: Logo - Progress - Add Button */}
            <header className="app-header">
                <div className="brand-section">
                    <div className="brand-icon">
                        {/* Red Square with Checkmark */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" stroke="none" />
                            <path d="M8 12l3 3 6-6" stroke="white" />
                        </svg>
                    </div>
                    <span className="brand-title">Praxis</span>
                </div>

                <div className="header-actions">
                    <span className="task-progress">
                        <strong>{completedTasks}</strong> / {totalTasks} tasks
                    </span>
                    <button className="primary-add-btn" onClick={() => setIsModalOpen(true)}>
                        + Add Task
                    </button>
                    <button onClick={logout} className="logout-btn" style={{
                        marginLeft: '1rem',
                        background: 'none',
                        border: '1px solid #404040',
                        color: '#e0e0e0',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon-wrapper icon-red">
                        🎯
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{completionPercentage}%</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper icon-green">
                        📈
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{completedTasks}</div>
                        <div className="stat-label">Done</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper icon-orange">
                        🕒
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{pendingTasks}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                </div>
            </div>

            {/* Filter Row */}
            <div className="filter-row">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        <span className="filter-icon">{getCategoryIcon(cat)}</span>
                        {cat}
                        <span className="filter-count">
                            {cat === 'All' ? tasks.length : tasks.filter(t => t.category === cat).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* To Do Section */}
            <div className="section-header">
                TO DO ({todoTasks.length})
            </div>
            <div className="task-list-group">
                {todoTasks.map(task => (
                    <div key={task._id} className="task-card">
                        <div
                            className="checkbox-circle"
                            onClick={() => toggleTaskComplete(task._id, task.completed)}
                        ></div>
                        <div className="task-details">
                            <div className="task-text">{task.title}</div>
                            <div className="task-subtext">
                                {task.category} • {new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                        <div className="priority-tag priority-med">Med</div>
                        <button
                            className="delete-icon-btn"
                            onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            {/* Completed Section */}
            {doneTasks.length > 0 && (
                <>
                    <div className="section-header" style={{ marginTop: '2rem' }}>
                        COMPLETED ({doneTasks.length})
                    </div>
                    <div className="task-list-group">
                        {doneTasks.map(task => (
                            <div key={task._id} className="task-card completed">
                                <div
                                    className="checkbox-circle checked"
                                    onClick={() => toggleTaskComplete(task._id, task.completed)}
                                >
                                    ✓
                                </div>
                                <div className="task-details">
                                    <div className="task-text">{task.title}</div>
                                    <div className="task-subtext">
                                        {task.category} • {new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                                <div className="priority-tag priority-low">Low</div>
                                <button
                                    className="delete-icon-btn"
                                    onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={addTask}
                />
            )}
        </div>
    );
}

export default App;
