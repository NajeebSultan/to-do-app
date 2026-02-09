const categories = [
    { id: 'all', label: 'All', icon: 'grid' },
    { id: 'personal', label: 'Personal', icon: 'person' },
    { id: 'work', label: 'Work', icon: 'briefcase' },
    { id: 'shopping', label: 'Shopping', icon: 'cart' },
    { id: 'health', label: 'Health', icon: 'heart' },
    { id: 'learning', label: 'Learning', icon: 'book' }
];

const icons = {
    grid: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="5" height="5" fill="currentColor" />
            <rect x="9" y="2" width="5" height="5" fill="currentColor" />
            <rect x="2" y="9" width="5" height="5" fill="currentColor" />
            <rect x="9" y="9" width="5" height="5" fill="currentColor" />
        </svg>
    ),
    person: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 10c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3z" fill="currentColor" />
        </svg>
    ),
    briefcase: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4h-3V3a1 1 0 00-1-1H7a1 1 0 00-1 1v1H3a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1zM7 3h2v1H7V3z" fill="currentColor" />
        </svg>
    ),
    cart: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2l-.5 2H1v2h1l1 8h10l1-8h1V4h-3.5L11 2H5zm1 2h4l.25 1H5.75L6 4z" fill="currentColor" />
        </svg>
    ),
    heart: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.5c-1.5-1.5-4-1.5-5.5 0C1 4 1 6.5 2.5 8L8 13.5 13.5 8c1.5-1.5 1.5-4 0-5.5-1.5-1.5-4-1.5-5.5 0z" fill="currentColor" />
        </svg>
    ),
    book: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L2 5l6 3 6-3-6-3zM2 9l6 3 6-3M2 7l6 3 6-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
    )
};

function CategoryFilters({ activeCategory, setActiveCategory, categoryCounts }) {
    return (
        <div className="category-filters">
            {categories.map(category => (
                <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                >
                    {icons[category.icon]}
                    {category.label} <span className="category-count">{categoryCounts[category.id]}</span>
                </button>
            ))}
        </div>
    );
}

export default CategoryFilters;
