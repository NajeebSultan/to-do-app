function CategoryGrid({ tasks }) {
    // Calculate counts
    const counts = {
        health: tasks.filter(t => t.category === 'health').length,
        work: tasks.filter(t => t.category === 'work').length,
        mental: tasks.filter(t => t.category === 'mental').length,
        others: tasks.filter(t => !['health', 'work', 'mental'].includes(t.category)).length
    };

    const categories = [
        { id: 'health', label: 'Health', count: counts.health, icon: '♥', color: 'blue' },
        { id: 'work', label: 'Work', count: counts.work, icon: '📓', color: 'green' },
        { id: 'mental', label: 'Mental Health', count: counts.mental, icon: '🧠', color: 'pink' },
        { id: 'others', label: 'Others', count: counts.others, icon: '📁', color: 'gray' }
    ];

    return (
        <div className="category-grid">
            {categories.map(cat => (
                <div key={cat.id} className={`category-card card-${cat.color}`}>
                    <div className="cat-icon">{cat.icon}</div>
                    <div className="cat-info">
                        <span className="cat-count">{cat.count}</span>
                        <span className="cat-label">{cat.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryGrid;
