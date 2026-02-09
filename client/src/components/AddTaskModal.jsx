import { useState } from 'react';

function AddTaskModal({ onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('Med');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

    const categories = ['Personal', 'Work', 'Shopping', 'Health', 'Learning'];
    const priorities = ['High', 'Med', 'Low'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddTask({
            title,
            description: desc,
            category,
            priority, // Using the new field
            dueDate,
            completed: false,
            createdAt: new Date()
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>New Task</h2>
                    <button className="modal-close-icon" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="proper-form">

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input-main"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-textarea"
                            placeholder="Add a note... (optional)"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="select-wrapper">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="form-select"
                            >
                                {priorities.map(p => <option key={p} value={p}>{p} Priority</option>)}
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <input
                                type="date"
                                className="form-select" // Re-using select style for consistency
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-save">Add Task</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddTaskModal;
