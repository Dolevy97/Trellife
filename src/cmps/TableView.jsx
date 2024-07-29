import { useEffect } from "react"
import { getFormattedShortTime, isLightColor } from "../services/util.service"
import clockIcon from '../assets/imgs/Icons/clock.svg'


export function TableView({ groups, board }) {



    useEffect(() => {
        // Your code here
    }, [])

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    function getMemberById(id) {
        const member = board.members.find(member => member._id === id)
        return member || {
            _id: 'unknown',
            imgUrl: 'path/to/default/image.png',
            fullname: 'Unknown Member'
        }
    }

    function getTaskStatus(task) {
        if (!task.dueDate) {
            return null
        }

        const now = new Date()
        const dueDate = new Date(task.dueDate)
        const timeDiff = dueDate - now
        const dayInMilliseconds = 24 * 60 * 60 * 1000

        if (task.isDone) {
            return {
                title: 'This card is complete.',
                style: { backgroundColor: '#4BCE97' },
                textColor: '#1d2125',
                iconFilter: 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)'
            }
        } else if (timeDiff < -dayInMilliseconds) {
            // Overdue by more than a day
            return {
                title: 'This card is past due.',
                style: { backgroundColor: '#42221F' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }
        } else if (timeDiff < 0) {
            // Overdue by less than a day
            return {
                title: 'This card is recently overdue!',
                style: { backgroundColor: '#F87462' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }
        } else if (timeDiff <= dayInMilliseconds) {
            return {
                title: 'This card is due soon.',
                style: { backgroundColor: '#F5CD47' },
                textColor: '#1d2125',
                iconFilter: 'none'
            }
        }

        return {
            title: 'This card is due later.',
            style: {},
            textColor: '',
            iconFilter: 'none'
        }
    }

    return (
        <section className="table-outside-container">
            <section className="table-container">
                <table className="table-view">
                    <thead className="table-header">
                        <tr>
                            <th className="short-width"></th>
                            <th className="long-width">Card</th>
                            <th className="mid-width">List</th>
                            <th className="mid-width">Labels</th>
                            <th className="mid-width">Members</th>
                            <th className="mid-width">Due date</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {groups.map(group => (
                            group.tasks.map(task => {
                                const taskStatus = getTaskStatus(task)
                                return (
                                    <tr key={task.id}>
                                        <td className="short-width">
                                            <svg className="grab-icon" width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><circle cx="10" cy="8" r="1"></circle><circle cx="14" cy="8" r="1"></circle><circle cx="10" cy="16" r="1"></circle><circle cx="14" cy="16" r="1"></circle><circle cx="10" cy="12" r="1"></circle><circle cx="14" cy="12" r="1"></circle></g></svg>
                                        </td>
                                        <td className="long-width">{task.title}</td>
                                        <td className="mid-width">{group.title}</td>
                                        <td className="mid-width">
                                            <div className="labels-container">
                                                {task.labelsIds && task.labelsIds.map(id => {
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
                                                                <span className="label-title" style={{ color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}>{label.title}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {!task.labelsIds.length && <div className="table-no-content"></div>}
                                            </div>
                                        </td>
                                        <td className="mid-width">
                                            {task.membersIds && task.membersIds
                                                .map(getMemberById)
                                                .filter(member => member._id !== 'unknown')
                                                .map((member, idx, members) => (
                                                    <img
                                                        key={member._id}
                                                        className="member-thumbnail"
                                                        src={member.imgUrl}
                                                        title={member.fullname}
                                                        alt={member.fullname}
                                                        style={{ zIndex: members.length - idx }}
                                                    />
                                                ))
                                            }
                                            {!task.membersIds.length && <div className="table-no-content"></div>}
                                            </td>
                                        <td className="mid-width">
                                            {task.dueDate && (
                                                <div
                                                    title={taskStatus.title}
                                                    className="timer-container"
                                                    style={taskStatus.style}
                                                >
                                                    <img
                                                        src={clockIcon}
                                                        alt="clock icon"
                                                        style={{ filter: taskStatus.iconFilter }}
                                                    />
                                                    <span
                                                        style={{ color: taskStatus.textColor }}
                                                    >
                                                        {getFormattedShortTime(task.dueDate)}
                                                    </span>
                                                </div>
                                            )}
                                            {!task.dueDate && <div className="table-no-content"></div>}
                                        </td>
                                        {/* Add more cells for other task properties */}
                                    </tr>
                                )
                            })
                        ))}
                        <tr className="table-footer-last-element">
                            <td className="table-footer-last-element" colSpan="6"></td>
                        </tr>
                        <tr className="table-footer">
                            <td className="table-footer" colSpan="6"></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>

    )
}