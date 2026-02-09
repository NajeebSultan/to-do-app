function Statistics({ completionPercentage, doneCount, pendingCount }) {
    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="stat-icon stat-icon-completed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-value">{completionPercentage}%</div>
                    <div className="stat-label">Completed</div>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-icon-done">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-value">{doneCount}</div>
                    <div className="stat-label">Done</div>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-icon-pending">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="stat-content">
                    <div className="stat-value">{pendingCount}</div>
                    <div className="stat-label">Pending</div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
