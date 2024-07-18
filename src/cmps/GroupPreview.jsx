import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


import { boardService } from '../services/board/'
import {updateBoard } from '../store/actions/board.actions'





export function GroupPreview({ group, boardId, board, setBoard }) {
    const tasks = group?.tasks || []
    
    async function handleAddTask() {
        try {
            const newTask = boardService.getEmptyTask()
            const updatedGroup = {
                ...group,
                tasks: [...group.tasks, newTask]
            }
            const updatedGroups = board.groups.map(g => g.id === group.id ? updatedGroup : g)
            const updatedBoard = {
                ...board,
                groups: updatedGroups
            }
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard) 
            // console.log(newTask);
        } catch (err) {
            console.error('Failed to add task:', err)
        }
    }
    

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
                    <div key={task.id} className="tasks-container">
                        <Link className='task-links' key={task.id} replace to={`/board/${boardId}/${group.id}/${task.id}`}>
                            <div className='task-preview'>
                                <span>{task.title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <footer className='group-preview-footer'>
                <span className="add-icon" onClick={handleAddTask}>+Add a card</span>
            </footer>
           
        </section>
    )
}