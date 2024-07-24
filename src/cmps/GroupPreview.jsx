import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { boardService } from '../services/board/'
import { updateBoard } from '../store/actions/board.actions'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import autosize from 'autosize'
import { getFormattedShortTime } from '../services/util.service'
import { useSelector } from 'react-redux'
import { addTask } from "../store/actions/task.actions"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { updateGroup } from '../store/actions/group.actions'


export function GroupPreview({ group, boardId, handleOnDragEnd, toggleLabelExpansion, areLabelsExpanded }) {
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
            setNewTaskTitle('')
        }
    }

    function handleTitleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            onAddTask()
            setNewTaskTitle('')
            if (addTaskRef.current) {
                const textarea = addTaskRef.current.querySelector('textarea')
                if (textarea) {
                    setTimeout(() => {
                        textarea.focus()
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

    function getDoneInChecklist(taskId, groupId) {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task.checklists.reduce((total, checklist) => {
            return total + (Array.isArray(checklist.todos) ? checklist.todos.filter(todo => todo.isDone).length : 0)
        }, 0)
    }

    function getAllTodosInChecklist(taskId, groupId) {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task.checklists.reduce((total, checklist) => {
            return total + (Array.isArray(checklist.todos) ? checklist.todos.length : 0)
        }, 0)
    }


    const labelsIds = taskToEdit?.labelsIds || []

    return (
        <section className={`group-preview-container ${group.style.isCollapse ? 'collapsed' : ''}`}
            style={group.style}>

            {!group.style.isCollapse ? (
                <>
                    <GroupPreviewHeader
                        group={group}
                        openMenuGroupId={openMenuGroupId}
                        setOpenMenuGroupId={setOpenMenuGroupId}
                        onAddTaskClick={() => setIsAddingTask(true)}
                    />


                    <Droppable droppableId={group.id} type="TASK">
                        {(provided) => (
                            <div
                                className="group-preview"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`task-container ${snapshot.isDragging ? 'dragging' : ''}`}
                                                onClick={() => handleTaskClick(task.id)}
                                            >
                                                <div
                                                    className={`task-inner-container ${task.style?.backgroundImage ? 'task-inner-container-img' : ''}`}
                                                    style={task.style && task.style.isFull ? { ...task.style, borderRadius: '8px' } : {}}
                                                >
                                                    {task.style && !task.style.isFull && (
                                                        <section
                                                            className={`cover-container ${task.style?.backgroundImage ? 'cover-container-img' : ''}`}
                                                            style={{ ...task.style }}>
                                                        </section>
                                                    )}

                                                    <div className='pen-display'>
                                                        <img src="../../../src\assets\imgs\Icons\pen.svg" />
                                                    </div>

                                                    <section className={`task-info-container ${task.style && task.style.backgroundImage && task.style.isFull ? 'is-full' : ''}`}
                                                        style={{
                                                            padding: task.style?.isFull ? '8px 8px 8px 12px' : '8px 6px 8px 12px',
                                                            minHeight: task.style?.isFull ? '40px' : '',
                                                            marginTop: task.style?.isFull ? '15px' : ''
                                                        }}>
                                                        {(!task.style || !task.style.isFull) && (
                                                            <div className='label-container'>
                                                                {task.labelsIds && task.labelsIds.map(id => {
                                                                    const label = getLabelById(id)
                                                                    return label && (
                                                                        <div
                                                                            key={id}
                                                                            className={`label-tab ${areLabelsExpanded ? 'expanded' : ''}`}
                                                                            onClick={toggleLabelExpansion}
                                                                            title={label.title}>
                                                                            <div
                                                                                className="label-color"
                                                                                style={{ backgroundColor: label.color }}
                                                                            >
                                                                                {areLabelsExpanded && <span className="label-title">{label.title}</span>}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}

                                                        <div className={`title-container ${task.style?.backgroundImage ? 'img-title-container' : ''}`}
                                                            style={{ marginBlockEnd: task.style?.isFull ? '0' : '4px', color: task.style?.isFull ? '#172B4D' : 'inherit' }}
                                                        >
                                                            <span style={{
                                                                fontWeight: task.style?.isFull ? '500' : 'normal',
                                                                fontSize: task.style?.isFull ? '1em' : ''

                                                            }}>{task.title}</span>
                                                        </div>


                                                        {(!task.style || !task.style.isFull) && (
                                                            <div className='task-bottom-container'>
                                                                <div className='bottom-leftside'>
                                                                    {task.dueDate && (
                                                                        <div
                                                                            title={task.isDone ? 'This task is complete.' : 'This task is due later.'}
                                                                            className="timer-container"
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
                                                                    {getComments(task.id).length ?
                                                                        <div title='Comments' className='comment-container'>
                                                                            <img src="../../../src\assets\imgs\Icons\comment.svg" />
                                                                            <span className='task-comment'>{getComments(task.id).length} </span>
                                                                        </div> : ''
                                                                    }
                                                                    {task.attachments.length ?
                                                                        <div title='Attachments' className='attachment-container'>
                                                                            <img src="../../../src\assets\imgs\TaskDetails-icons\attachment.svg" />
                                                                            <span className='task-comment'>{task.attachments.length}</span>
                                                                        </div> : ''
                                                                    }
                                                                    {task.checklists.length && getAllTodosInChecklist(task.id, group.id) !== 0 ? (
                                                                        <div
                                                                            title='Checklist items'
                                                                            className='task-checklist-container'
                                                                            style={{
                                                                                backgroundColor: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? '#4BCE97' : '',
                                                                                color: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? '#1d2125' : '',
                                                                                padding: '2px 4px',
                                                                                borderRadius: '3px'
                                                                            }}
                                                                        >
                                                                            <img
                                                                                src="../../../src\assets\imgs\Icons\checklist.svg"
                                                                                style={{
                                                                                    filter: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id)
                                                                                        ? 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)'
                                                                                        : ''
                                                                                }}
                                                                            />
                                                                            <span
                                                                                className='task-checklist'
                                                                                style={{
                                                                                    backgroundColor: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? 'var(--bgclr1)' : ''
                                                                                }}
                                                                            >
                                                                                {getDoneInChecklist(task.id, group.id)}/{getAllTodosInChecklist(task.id, group.id)}
                                                                            </span>
                                                                        </div>
                                                                    ) : ''}
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
                                                            </div>
                                                        )}
                                                    </section>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {isAddingTask && (
                                    <div className='addtask-from-container' ref={addTaskRef} style={group.style}>
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
                                    </div>
                                )}
                            </div>
                        )}
                    </Droppable>
                    {!isAddingTask && (
                        <footer className='group-preview-footer'>
                            <span className="add-icon" onClick={() => setIsAddingTask(true)}>
                                <img src="../../../src/assets/imgs/Icons/add.svg" alt="add" />
                                Add a card
                            </span>
                        </footer>
                    )}
                </>
            ) : (
                <div className="collapsed-group-container">
                    <img
                        className="collapse-icon "
                        src="../../../src/assets/imgs/Icons/expand.svg"
                        alt="expand"
                        title="expand"
                        onClick={() => {
                            const updatedGroup = {
                                ...group,
                                style: {
                                    ...group.style,
                                    isCollapse: false
                                }
                            };
                            updateGroup(updatedGroup.id, updatedGroup, board)
                        }}
                    />
                    <span className='collapse-title'>{group.title}</span>
                    <span className='collapse-length'> {group.tasks.length}</span>

                </div>
            )}

        </section>
    )
}