import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { boardService } from '../services/board/'
import { updateBoard } from '../store/actions/board.actions'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import autosize from 'autosize'
import { getFormattedShortTime } from '../services/util.service'
import { useSelector } from 'react-redux'
import { addTask } from "../store/actions/task.actions"


export function GroupPreview({ group, boardId }) {
    const tasks = group?.tasks || []
    const board = useSelector(storeState => storeState.boardModule.board)

    const [openMenuGroupId, setOpenMenuGroupId] = useState(null)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const addTaskRef = useRef(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const textareaRef = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(event) {
            if (addTaskRef.current && !addTaskRef.current.contains(event.target)) {
                setIsAddingTask(false)
                setNewTaskTitle('')
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [addTaskRef])

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current)
        }

        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current)
            }
        }
    }, [newTaskTitle])

    function handleTaskClick(taskId) {
        navigate(`/board/${boardId}/${group.id}/${taskId}`, { replace: true })

    }

    async function onAddTask() {
        if (!newTaskTitle.trim()) return

        const newBoard = await addTask(newTaskTitle, group, board)
        if (newBoard) {
            setIsAddingTask(false)
            setNewTaskTitle('')
        }
    }

    function handleTitleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            onAddTask()
            setNewTaskTitle('')
            if (addTaskRef.current) {
                const input = addTaskRef.current.querySelector('input')
                if (input) {
                    setTimeout(() => {
                        input.focus()
                    }, 0)
                }
            }
        }
    }

    function getMemberById(id) {
        return board.members.find(member => member._id === id)
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    function getComments(taskId) {
        let comments = board.activities.filter(activity => {
            return activity.title === 'add comment' && activity.task.id === taskId
        })
        if (!comments) return []
        comments = comments.sort((a, b) => b.createdAt - a.createdAt)
        return comments
    }

    function getAllTodosInChecklist(taskId, groupId) {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const allTodos = task.checklists.map(checklist => {
            return {
                ...checklist,
                todos: checklist.todos
            }
        })
        return allTodos
    }

    function getDoneInChecklist(taskId, groupId) {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const doneInChecklist = task.checklists.map(checklist => {
            if (!Array.isArray(checklist.todos)) {
                return { ...checklist, todos: [] }
            }
            return {
                ...checklist,
                todos: checklist.todos.filter(todo => todo.isDone)
            }
        }).filter(checklist => checklist.todos.length > 0)
        return doneInChecklist
    }

    const labelsIds = taskToEdit?.labelsIds || []

    return (
        <section className="group-preview-container">
            <GroupPreviewHeader
                group={group}
                openMenuGroupId={openMenuGroupId}
                setOpenMenuGroupId={setOpenMenuGroupId}
                onAddTaskClick={() => setIsAddingTask(true)}

            />
            <div className="group-preview">
                {tasks.map(task => (
                    <div key={task.id} className="task-container" onClick={() => handleTaskClick(task.id)}>
                        <div
                            className='task-inner-container'
                            style={task.style && task.style.isFull ? { backgroundColor: task.style.backgroundColor, borderRadius: '8px' } : {}}                        >
                            {task.style && !task.style.isFull && (
                                <section className='task-cover-container' style={{ ...task.style }}>
                                </section>
                            )}

                            <section className='task-info-container'>
                                {(!task.style || !task.style.isFull) && (
                                    <div className='task-label-container'>
                                        {task.labelsIds && task.labelsIds.map(id => {
                                            const label = getLabelById(id)
                                            return label && (
                                                <div
                                                    className="label-tab"
                                                    key={id}
                                                    style={{ backgroundColor: label.color }}
                                                    title={label.title}
                                                >
                                                    <span className="label-title">{label.title}</span>
                                                </div>
                                            )
                                        })}
                                    </div>)}

                                <div className='task-title-container'>
                                    <span>{task.title}</span>
                                </div>

                                <div className='pen-display'>
                                    <img src="../../../src\assets\imgs\Icons\pen.svg" />
                                </div>
                                {(!task.style || !task.style.isFull )&& (
                                <div className='task-bottom-container'>
                                    <div className='task-bottom-leftside'>
                                        {task.dueDate && (
                                            <div
                                                title={task.isDone ? 'This task is complete.' : 'This task is due later.'}
                                                className="task-bottom-container"
                                                style={!task.isDone ? {} : { backgroundColor: '#4BCE97' }}
                                            >
                                                <img
                                                    src="../../../src/assets/imgs/Icons/clock.svg"
                                                    alt="clock icon"
                                                    style={!task.isDone ? {} : { filter: 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)' }}
                                                />
                                                <span
                                                    style={!task.isDone ? {} : { color: '#1d2125' }}

                                                    >{getFormattedShortTime(task.dueDate)}</span>
                                                </div>
                                            )}
                                            {task.description && task.description.trim() !== '' && (
                                                <img title='This card has a description.' src="../../../src/assets/imgs/Icons/description.svg" alt="description" />
                                            )}
                                            {getComments(task.id).length ? <div title='Comments' className='task-comment-container'>
                                                <img src="../../../src\assets\imgs\Icons\comment.svg" />
                                                <span className='task-comment'>{getComments(task.id).length} </span>
                                            </div> : ''}
                                            {task.attachments.length ? <div title='Attachments' className='task-attachment-container'>
                                                <img src="../../../src\assets\imgs\TaskDetails-icons\attachment.svg" />
                                                <span className='task-comment'>1</span>
                                            </div> : ''}
                                            <div title='Checklist items' className='task-checklist-container' >
                                                <img src="../../../src\assets\imgs\Icons\checklist.svg" />
                                                <span className='task-checklist'>{getDoneInChecklist(task.id, group.id).length}/{getAllTodosInChecklist(task.id, group.id).length}</span>
                                            </div>
                                        </div>

                                        <div className='members-container'>
                                            {task.membersIds && task.membersIds.map(id => {
                                                const member = getMemberById(id)
                                                return (
                                                    <img
                                                        key={member._id}
                                                        className="member-thumbnail"
                                                        src={member.imgUrl}
                                                        title={member.fullname}
                                                        alt={member.fullname}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>)}

                            </section>
                        </div>
                    </div>
                ))}
                {isAddingTask && (
                    <div className='addtask-from-container' ref={addTaskRef}>
                        <form className='addtask-form' onSubmit={(e) => e.preventDefault()}>
                            <textarea
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyPress={handleTitleKeyPress}
                                autoFocus
                                placeholder="Enter a title for this card..."
                                ref={textareaRef}
                            />
                            <div className='addtask-btns'>
                                <span onClick={onAddTask}>Add card</span>
                                <div className="close-btn-wrapper" onClick={() => {
                                    setIsAddingTask(false)
                                    setNewTaskTitle('')
                                }}>
                                    <img src="../../../src/assets/imgs/Icons/close.svg" alt="" />
                                </div>
                            </div>
                        </form>
                    </div>)}
            </div>
            {!isAddingTask && (
                <footer className='group-preview-footer'>
                    <span className="add-icon" onClick={() => setIsAddingTask(true)}>
                        <img src="../../../src/assets/imgs/Icons/add.svg" alt="add" />
                        Add a task
                    </span>
                </footer>
            )}
        </section>
    )
}