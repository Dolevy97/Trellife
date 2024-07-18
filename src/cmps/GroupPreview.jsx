import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { boardService } from '../services/board/'
import { updateBoard } from '../store/actions/board.actions'

export function GroupPreview({ group, boardId, board, setBoard }) {
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(group.title)
    const tasks = group?.tasks || []

    async function handleAddTask() {
        try {
            const newTask = boardService.getEmptyTask()
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
        } catch (err) {
            console.error('Failed to add task:', err)
        }
    }

    async function handleTitleClick() {
        setIsEditing(true)
    }

    async function handleInputChange(event) {
        setNewTitle(event.target.value)
    }

    async function handleTitleUpdate() {
        let titleToSet = newTitle.trim()
        if (titleToSet === '') {
            titleToSet = group.title
        }
            const updatedBoard = {
                ...board,
                groups: board.groups.map(g =>
                    g.id === group.id ? { ...g, title: titleToSet } : g//<if empty 
                )
            }
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
    
        setNewTitle(titleToSet)  
        setIsEditing(false)
    }

    async function handleTitleBlur() {
        await handleTitleUpdate()
    }

    async function handleTitleKeyPress(event) {
        if (event.key === 'Enter') {
            await handleTitleUpdate()
        }
    }
    useEffect(() => {
        setNewTitle(group.title)
    }, [group.title])

    return (
        <section className="group-preview-container">
            <header className='group-preview-header'>
                {isEditing ? (
                    <input
                    type="text"
                    value={newTitle}
                    onChange={handleInputChange}
                    onBlur={handleTitleBlur}
                    onKeyPress={handleTitleKeyPress}
                    autoFocus
                        
                    />
                ) : (
                    <span onClick={handleTitleClick}>{group.title}</span>
                )}
                <div>
                    <img className='svg-color' src="../src/assets/styles/imgs/Icones/collapse.svg" alt="collapse" />
                    <img className='svg-color' src="../src/assets/styles/imgs/Icones/3dots.svg" alt="options" />
                </div>
            </header>
            <div className="group-preview-tasks">
                {tasks.map(task => (
                    <div key={task.id} className="tasks-container">
                        <Link className='task-links' to={`/board/${boardId}/${group.id}/${task.id}`}>
                            <div className='task-preview'>
                                <span>{task.title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <footer className='group-preview-footer'>
                <span className="add-icon" onClick={handleAddTask}>
                    <img src="../src/assets/styles/imgs/Icones/add.svg" alt="add" />
                    Add a card
                </span>
            </footer>
        </section>
    )
}