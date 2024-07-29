export function TableView({ groups, board }) {

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    return (
        <table className="table-view">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>List</th>
                    <th>Labels</th>
                    {/* Add more headers for other task properties */}
                </tr>
            </thead>
            <tbody>
                {groups.map(group => (
                    group.tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{group.title}</td>
                            <td>{task.labelsIds && task.labelsIds.map(id => {
                                const label = getLabelById(id)
                                return label?.color && (
                                    <div
                                        key={id}
                                        className={`table-label-tab`}
                                        title={label.title}>
                                        <div
                                            className="label-color"
                                            style={{ backgroundColor: label.color }}
                                        >
                                        </div>
                                    </div>
                                )
                            })}</td>
                            {/* Add more cells for other task properties */}
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    )
}