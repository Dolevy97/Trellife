import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import autosize from 'autosize'
import { getFormattedShortTime } from '../services/util.service'
import { useSelector } from 'react-redux'
import { addTask } from "../store/actions/task.actions"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { updateGroup } from '../store/actions/group.actions'
import { QuickEditTask } from './QuickEditTask'

import penIcon from '../assets/imgs/Icons/pen.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'
import descriptionIcon from '../assets/imgs/Icons/description.svg'
import commentIcon from '../assets/imgs/Icons/comment.svg'
import attachmentIcon from '../assets/imgs/TaskDetails-icons/attachment.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import closeIcon from '../assets/imgs/Icons/close.svg'
import addIcon from '../assets/imgs/Icons/add.svg'
import expandIcon from '../assets/imgs/Icons/expand.svg'

export function GroupPreview({ group, boardId, handleOnDragEnd, toggleLabelExpansion, areLabelsExpanded }) {
    const tasks = group?.tasks || []
    const board = useSelector(storeState => storeState.boardModule.board)

    const [openMenuGroupId, setOpenMenuGroupId] = useState(null)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [quickEditTaskId, setQuickEditTaskId] = useState(null)
    const [quickEditTaskPosition, setQuickEditTaskPosition] = useState(null);



    const buttonRef = useRef(null)
    const textareaRef = useRef(null)
    const addTaskRef = useRef(null)

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
        setNewTaskTitle('')
        await addTask(newTaskTitle, group, board)
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

    function getTaskStatus(task) {
        if (!task.dueDate) {
            return null;
        }

        const now = new Date();
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate - now;
        const dayInMilliseconds = 24 * 60 * 60 * 1000;

        if (task.isDone) {
            return {
                title: 'This card is complete.',
                style: { backgroundColor: '#4BCE97' },
                textColor: '#1d2125',
                iconFilter: 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)'
            };
        } else if (timeDiff < -dayInMilliseconds) {
            // Overdue by more than a day
            return {
                title: 'This card is past due.',
                style: { backgroundColor: '#42221F' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            };
        } else if (timeDiff < 0) {
            // Overdue by less than a day
            return {
                title: 'This card is recently overdue!',
                style: { backgroundColor: '#F87462' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            };
        } else if (timeDiff <= dayInMilliseconds) {
            return {
                title: 'This card is due soon.',
                style: { backgroundColor: '#F5CD47' },
                textColor: '#1d2125',
                iconFilter: 'none'
            };
        }

        return {
            title: 'This card is due later.',
            style: {},
            textColor: '',
            iconFilter: 'none'
        };
    }


    function getQuickEditPosition() {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const positionX = buttonRect.right
        const positionY = buttonRect.top
        return ({ left: positionX, top: positionY })
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
                                {tasks.map((task, index) => {
                                    const taskStatus = getTaskStatus(task);
                                    return (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`task-container ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    onClick={() => handleTaskClick(task.id)}
                                                >
                                                    {quickEditTaskId === task.id && (
                                                        <QuickEditTask
                                                            // style={{style:()=>{}}}
                                                            task={tasks.find(t => t.id === quickEditTaskId)}
                                                            onClose={(e) => {
                                                                e.stopPropagation()
                                                                setQuickEditTaskId(null)
                                                                setQuickEditTaskPosition(null)
                                                            }}
                                                            taskPosition={quickEditTaskPosition}
                                                        />
                                                    )}
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

                                                        <div
                                                            className='pen-display'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const taskElement = e.currentTarget.closest('.task-container');
                                                                const rect = taskElement.getBoundingClientRect();
                                                                setQuickEditTaskPosition({
                                                                    left: rect.left,
                                                                    top: rect.top,
                                                                    width: rect.width
                                                                });
                                                                setQuickEditTaskId(task.id);
                                                            }}
                                                        >
                                                            <img src={penIcon} />
                                                        </div>


                                                        <section className={`task-info-container ${task.style && task.style.backgroundImage && task.style.isFull ? 'is-full' : ''}`}
                                                            style={{
                                                                padding: task.style?.isFull ? '8px 8px 8px 12px' : '8px 12px 4px',
                                                                minHeight: task.style?.isFull ? '40px' : '',
                                                                marginTop: task.style?.isFull ? '15px' : ''
                                                            }}>
                                                            {(!task.style || !task.style.isFull) && (
                                                                <div className='label-container'>
                                                                    {task.labelsIds && task.labelsIds.map(id => {
                                                                        const label = getLabelById(id)
                                                                        return label?.color && (
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
                                                                style={{
                                                                    marginBlockEnd: task.style?.isFull ? '0' : '4px',

                                                                    color: task.style?.isFull && !task.style?.backgroundImage ? 'white' :
                                                                        task.style?.backgroundImage && task.style?.isFull ? '#172B4D' :
                                                                            'inherit'
                                                                }}
                                                            >
                                                                <span style={{
                                                                    fontWeight: task.style?.isFull ? '500' : 'normal',
                                                                    fontSize: task.style?.isFull ? '1em' : ''
                                                                }}>
                                                                    {task.title}</span>
                                                            </div>

                                                            {(!task.style || !task.style.isFull) && (
                                                                <div className='task-bottom-container'>
                                                                    <div className='bottom-leftside'>
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
                                                                        {task.description && task.description.trim() !== '' && (
                                                                            <img title='This card has a description.' src={descriptionIcon} alt="description" />
                                                                        )}
                                                                        {getComments(task.id).length ?
                                                                            <div title='Comments' className='comment-container'>
                                                                                <img src={commentIcon} />
                                                                                <span className='task-comment'>{getComments(task.id).length} </span>
                                                                            </div> : ''
                                                                        }
                                                                        {task.attachments.length ?
                                                                            <div title='Attachments' className='attachment-container'>
                                                                                <img src={attachmentIcon} />
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
                                                                                    src={checklistIcon}
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
                                    )
                                })}
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
                                                    <img src={closeIcon} alt="" />
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
                                <img src={addIcon} alt="add" />
                                Add a card
                            </span>
                        </footer>
                    )}
                </>
            ) : (
                <div className="collapsed-group-container">
                    <img
                        className="collapse-icon "
                        src={expandIcon}
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