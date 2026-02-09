import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import CategoryGrid from './components/CategoryGrid';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get Today's Date formatted: "26 Dec"
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
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
            const response = await axios.post(API_URL, taskData);
            setTasks([response.data, ...tasks]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTaskComplete = async (taskId, currentStatus) => {
        try {
            const response = await axios.put(`${API_URL}/${taskId}`, {
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
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="app-wrapper">
            <div className="brand-header-external">
                <div className="brand-logo-large">P</div>
                <span className="brand-name-large">Praxis</span>
            </div>

            <div className="container">
                <header className="main-header">
                    <h1>Today <span className="date-display">{dateFormatted}</span></h1>
                </header>

                <CategoryGrid tasks={tasks} />

                <div className="task-list-container">
                    <TaskList
                        tasks={sortedTasks}
                        onToggleComplete={toggleTaskComplete}
                        onDeleteTask={deleteTask}
                    />
                </div>

                <div className="fab-container">
                    <button className="fab-btn" onClick={() => setIsModalOpen(true)}>
                        <span>+</span>
                    </button>
                </div>

                {isModalOpen && (
                    <AddTaskModal
                        onClose={() => setIsModalOpen(false)}
                        onAddTask={addTask}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
