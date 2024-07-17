

export function GroupPreview({ group }) {
    const tasks = group?.tasks || []

    return (
        <section className="group-preview-container">
            <header className='group-preview-header'>
                <span>{group.title}</span>
            </header>

            {tasks.map(task => (
                <div key={task.id} className="group-preview-tasks">
                    <span>{task.title}</span>
                </div>
            ))}

            <footer className='group-preview-footer'>
                <span>Add a card</span>
            </footer>
        </section>
    )
}