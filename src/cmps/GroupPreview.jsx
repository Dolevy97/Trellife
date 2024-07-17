

export function GroupPreview({ group }) {
    const tasks = group?.tasks || []

    return (
        <section className="group-preview-container">
            <header className='group-preview-header'>
                <span>{group.title}</span>
            </header>
            <div className="group-preview-tasks">
                {tasks.map(task => (
                    <div key={task.id} className="tasks-container">
                        <span>{task.title}</span>
                    </div>
                ))}
            </div>
            <footer className='group-preview-footer'>
                <button className="add-card-button">
                    <span className="add-icon">+</span> Add a card
                </button>
            </footer>
        </section>
    )
}