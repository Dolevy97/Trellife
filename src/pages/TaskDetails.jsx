


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

    function getMemberById(id) {
        return board.members.find(member => member._id === id)
    }

    function getLabelById(id) {
        const label = board.labels.find(label => label.id === id)
        return label
    }

    if (!taskToEdit) return <section>Loading...</section>

    const { title, description, membersIds, labelsIds } = taskToEdit
    console.log(labelsIds);

    return (
        <div className="task-details-backdrop" onClick={onBack}>
            <form className="task-details" onSubmit={onSubmit} onClick={(ev) => ev.stopPropagation()}>

                <header className="task-header">
                    <h2 className="task-title">{title}</h2>
                </header>

                <div className="members-labels-notifications-date-container">

                    <div className="members-container">
                        <span>Members</span>
                        <div className="members-img-container">
                            {membersIds.map(id => {
                                const member = getMemberById(id)
                                return <img key={member._id} className="member-thumbnail" src='../../../src/assets/imgs/user-img1.jpg' title={member.fullname} />
                            }
                            )}
                        </div>
                    </div>

                    <div className="labels-container">
                        <span>Labels</span>
                        <div className="labels-container">
                            {labelsIds.map(id => {
                                const label = getLabelById(id)
                                return <span className="label" key={id} style={{ backgroundColor: label.color }}>{label.title}</span>
                            })}
                        </div>
                    </div>

                    <div className="date-container">
                        <span>Due date</span>
                        <div className="date">
                            <input type="checkbox" />
                            <input type="date" />
                        </div>
                    </div>
                </div>

                <div className="description-container">
                    <span>Description</span>
                    <textarea className="description" onChange={handleChange} value={description} name="description" />
                </div>


                <div className="activity-container">
                    <span>Activity</span>

                </div>

                <button>Submit</button>

            </form>
            {/* <pre>{JSON.stringify(taskToEdit,null,2)}</pre> */}
        </div >
    )
}

