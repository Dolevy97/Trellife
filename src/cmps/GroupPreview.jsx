import { useState } from 'react'
import { Link } from 'react-router-dom'
import { boardService } from '../services/board/'
import { updateBoard } from '../store/actions/board.actions'
import { GroupPreviewHeader } from './GroupPreviewHeader'

export function GroupPreview({ group, boardId, board, setBoard }) {
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

    return (
        <section className="group-preview-container">
            <GroupPreviewHeader group={group} board={board} setBoard={setBoard} />
            <div className="group-preview-tasks">
                {tasks.map(task => (
                    <div key={task.id} className="tasks-container">
                        <Link className='task-links' to={`/board/${boardId}/${group.id}/${task.id}`}>
                            <div className='task-preview'>
                                <span>{task.title}</span>
                                {task.description && task.description.trim() !== '' && (
                                    <span><img src="../src/assets/styles/imgs/Icones/description.svg" alt="description" /></span>
                                )}
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
