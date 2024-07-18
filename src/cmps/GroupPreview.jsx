
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function GroupPreview({ group ,boardId}) {
    const tasks = group?.tasks || []

    return (
        <section className="group-preview-container">
            <header className='group-preview-header'>
                <span>{group.title}</span>
                <div> <span> Collapse</span>
                    <span> Dots</span>
                </div>
            </header>
            <div className="group-preview-tasks">
                {tasks.map(task => (
                    <Link key={task.id} replace to={`/board/${boardId}/${group.id}/${task.id}`}>
                        <div className="tasks-container">
                            <span>{task.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <footer className='group-preview-footer'>
                <span className="add-icon">+Add a card</span>
            </footer>
           
        </section>
    )
}