import { useState } from 'react';

function AddTaskModal({ onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('personal');
    const [dueDate] = useState(new Date().toISOString().split('T')[0]);
    const [priority] = useState('med');

    const categories = ['personal', 'work', 'shopping', 'health', 'learning', 'mental'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddTask({
            title,
            category,
            dueDate,
            priority
        });
        setTitle('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>

                    <textarea
                        className="new-task-input"
                        placeholder="Write a new task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        rows={3}
                    />

                    <button type="button" className="add-subtask-btn">
                        <span className="checkbox-placeholder"></span>
                        <span style={{ marginLeft: '12px' }}>Add subtask</span>
                    </button>

                    <div style={{ marginTop: 'auto' }}>
                        <div className="modal-tags">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`modal-tag-btn tag-${cat} ${category === cat ? 'selected' : ''}`}
                                    onClick={() => setCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="modal-actions-row">
                            <button type="button" className="timer-btn">
                                🕒
                            </button>
                            <button type="button" className="timer-btn">
                                🏷️
                            </button>
                            <button
                                type="submit"
                                className="save-btn"
                                disabled={!title.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddTaskModal;
