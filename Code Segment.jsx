export function TaskDetails({ task, group, board, user }) {
    const [action, setAction] = useState(null)

    function onSetAction(ev, act) {
        ev.stopPropagation()
        setAction(action === act ? null : act)
    }

    const taskActionProps = {
        task,
        group,
        board,
        user,
        onClose: () => setAction(null)
    }

    return (
        <div className="task-details">
            {/* Other task detail content */}

            <div className="actions">
                <button onClick={(ev) => onSetAction(ev, 'members')}>
                    Members
                </button>
                <button onClick={(ev) => onSetAction(ev, 'labels')}>
                    Labels
                </button>
                <button onClick={(ev) => onSetAction(ev, 'checklist')}>
                    Checklist
                </button>
                {/* More action buttons */}
            </div>

            {action && (
                <TaskAction
                    action={action}
                    {...taskActionProps}
                    onSetAction={onSetAction}
                />
            )}
        </div>
    )
}