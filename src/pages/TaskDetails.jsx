


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board';
import { updateBoard } from '../store/actions/board.actions';
import { upadteTask } from '../store/actions/task.actions';

// import userImg from '../assets/imgs/user-img.JPG'

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
        try {
            upadteTask(taskToEdit, groupId, group, board)
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

    const { title, description, members } = taskToEdit

    return (
        <div className="task-details-backdrop" onClick={onBack}>
            <form className="task-details" onSubmit={onSubmit} onClick={(ev) => ev.stopPropagation()}>

                <header className="task-header">
                    <h2 className="task-title">{title}</h2>
                </header>
                
                <textarea className="task-description" onChange={handleChange} value={description} name="description" />

                <div className="members-labels-notifications-date-container">
                    <div className="members-container">
                        {members.map(member => <img key={member._id} className="member-thumbnail" src='../../../src/assets/imgs/user-img1.JPG' />
                        )}
                    </div>
                </div>
                
                <button>Submit</button>

            </form>
            {/* <pre>{JSON.stringify(taskToEdit,null,2)}</pre> */}
        </div >
    )
}

