


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board';
import { updateBoard } from '../store/actions/board.actions';

export function TaskDetails() {

    // const boards = useSelector(storeState => storeState.boardModule.boards)
    const [board, setBoard] = useState(null)
    const [group, setGroup] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)


    const { taskId, groupId, boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBoard()
    }, [])

    useEffect(() => {
        if (board) setTask()
    }, [board])

    async function getBoard() {
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)

        } catch (er) {
            console.log('err: ' + er)
        }
    }

    function setTask() {
        setTaskToEdit(() => {
            const group = board.groups.find(group => group.id === groupId)
            setGroup(group)
            const task = group.tasks.find(task => task.id === taskId)
            return task
        })
    }

    function onBack() {
        navigate(`/board/${boardId}`, { replace: true })
    }

    async function onSubmit(ev) {
        ev.preventDefault()

        let tasks = group.tasks
        tasks = tasks.map(task => {
            if (task.id !== taskToEdit.id) return task
            return taskToEdit
        })


        let groups = board.groups
        groups = groups.map(group => {
            if (group.id !== groupId) return group
            return { ...group, tasks }
        })


        const boardToSave = {...board, groups}
        
       
        try {
            await updateBoard(boardToSave)
            onBack()
        } catch (er) {
            console.log('err: ' + er)
        }
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target
        switch (type) {
            case 'number':
                value = +value || ''
                break
        }
        setTaskToEdit({ ...taskToEdit, [field]: value })
    }

    if (!taskToEdit) return <section>Loading...</section>

    const { title, description } = taskToEdit

    return (
        <div className="task-details-backdrop" onClick={onBack}>
            <form className="task-details" onSubmit={onSubmit} onClick={(ev) => ev.stopPropagation()}>
                <header className="task-header">
                    <h2 className="task-title">{title}</h2>
                </header>
                <textarea className="task-description" onChange={handleChange} value={description} name="description">

                </textarea>
                <button>Submit</button>
            </form>
        </div >
    )
}

