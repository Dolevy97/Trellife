import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { boardService } from '../services/board/'
import { updateBoard } from '../store/actions/board.actions'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export function GroupPreview({ group, boardId, board, setBoard }) {
    const tasks = group?.tasks || []
    const [openMenuGroupId, setOpenMenuGroupId] = useState(null)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const addTaskRef = useRef(null)
    const [taskToEdit, setTaskToEdit] = useState(null)

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


    function handleTaskClick(taskId) {
        navigate(`/board/${boardId}/${group.id}/${taskId}`, { replace: true })

    }

    async function handleAddTask() {
        if (!newTaskTitle.trim()) return

        try {
            const newTask = boardService.getEmptyTask()
            newTask.title = newTaskTitle.trim()
            const updatedGroup = {
                ...group,
                tasks: [...group.tasks, newTask]
            }
            const updatedBoard = {
                ...board,
                groups: board.groups.map(g => g.id === group.id ? updatedGroup : g)
            }
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
            console.log(newTask)
            setNewTaskTitle('')

        } catch (err) {
            console.error('Failed to add task:', err)
        }
    }

    function handleInputChange(e) {
        setNewTaskTitle(e.target.value)
    }

    function handleTitleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTask()
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


    // function setTask() {
    //     setTaskToEdit(() => {
    //         const group = board.groups.find(group => group.id === groupId)
    //         setGroup(group)
    //         // console.log(group)
    //         const task = group.tasks.find(task => task.id === taskId)
    //         return task
    //     })
    // }
    // function handleChange({ target }) {
    //     const { type, name: field } = target
    //     let { value } = target
    //     switch (type) {
    //         case 'number':
    //             value = +value || ''
    //             break
    //     }
    //     setTaskToEdit({ ...taskToEdit, [field]: value })
    // }

    function getMemberById(id) {
        return board.members.find(member => member._id === id)
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    const labelsIds = taskToEdit?.labelsIds || []

    return (
        <section className="group-preview-container">
            <GroupPreviewHeader
                group={group}
                board={board}
                setBoard={setBoard}
                openMenuGroupId={openMenuGroupId}
                setOpenMenuGroupId={setOpenMenuGroupId}
            />
            <div className="group-preview-tasks">
                {tasks.map(task => (
                    <div key={task.id} className="task-container" onClick={() => handleTaskClick(task.id)}>
                        <div className='task-preview'>
                            <div className='task-container1'>
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

                            </div>

                            <div className='task-container2'>
                                <span>{task.title}</span>
                            </div>

                            <div className='pen-display'>
                                <img src="../../../src\assets\imgs\Icones\pen.svg" />
                            </div>
                            <div className='task-container3'>
                                {task.description && task.description.trim() !== '' && (
                                    <span className='task-description'><img src="../../../src/assets/styles/imgs/Icones/description.svg" alt="description" /></span>
                                )}

                                <div className='members-container'>
                                    {task.membersIds && task.membersIds.map(id => {
                                        const member = getMemberById(id)
                                        return (
                                            <img
                                                key={member._id}
                                                className="member-thumbnail"
                                                src='../../../src/assets/imgs/user-imgs/user-img1.jpg'
                                                title={member.fullname}
                                                alt={member.fullname}
                                            />
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>
                ))}
                {isAddingTask && (
                    <div className='addtask-from-container' ref={addTaskRef}>
                        <form className='addtask-form' onSubmit={(e) => e.preventDefault()}>
                            <textarea
                                type="text"
                                value={newTaskTitle}
                                onChange={handleInputChange}
                                onKeyPress={handleTitleKeyPress}
                                autoFocus
                                placeholder="Enter a title for this card..."
                            />
                            <div className='addtask-btns'>
                                <span onClick={handleAddTask}>Add card</span>
                                <div className="close-btn-wrapper" onClick={() => {
                                    setIsAddingTask(false)
                                    setNewTaskTitle('')
                                }}>
                                    <img src="../../../src/assets/styles/imgs/Icones/close.svg" alt="" />
                                </div>
                            </div>
                        </form>
                    </div>)}
            </div>
            {!isAddingTask && (
                <footer className='group-preview-footer'>
                    <span className="add-icon" onClick={() => setIsAddingTask(true)}>
                        <img src="../../../src/assets/styles/imgs/Icones/add.svg" alt="add" />
                        Add a card
                    </span>
                </footer>
            )}
        </section>
    )
}