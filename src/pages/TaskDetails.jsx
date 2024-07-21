


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board';
import { updateBoard } from '../store/actions/board.actions';
import { updateTask } from '../store/actions/task.actions';
import { TaskAction } from '../cmps/TaskAction';

// import userImg from '../assets/imgs/user-img.JPG'

export function TaskDetails() {

    // const boards = useSelector(storeState => storeState.boardModule.boards)
    const [board, setBoard] = useState(null)
    const [group, setGroup] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [action, SetAction] = useState(null)


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
            // console.log(group)
            const task = group.tasks.find(task => task.id === taskId)
            return task
        })
    }

    function onBack() {
        navigate(`/board/${boardId}`, { replace: true })
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        // try {
        //     updateTask(taskToEdit, groupId, group, board)
        //     onBack()
        // } catch (er) {
        //     console.log('err: ' + er)
        // }
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

    // function onAddToCardClicked(action) {
    //     // const {target} = ev
    //     SetAction(action)
    // }

    if (!taskToEdit || !group) return <section>Loading...</section>

    const { title, description, membersIds, labelsIds } = taskToEdit

    return (
        <div className="task-details-backdrop" onClick={onBack}>
            <form className="task-details" onSubmit={onSubmit} onClick={(ev) => ev.stopPropagation()}>

                <header className="task-header">
                    <img className="card-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/card.svg" />
                    <span className="task-title">{title}</span>
                    <span className="task-in-list fs12">in list <span>{group.title}</span></span>
                    <img className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" />
                </header>

                <main className="task-main">
                    <section className="task-content">

                        <div className="members-labels-notifications-date-container">

                            <div className="members-container">
                                <span className="fs12">Members</span>
                                <div className="members-img-container">
                                    {membersIds.map(id => {
                                        const member = getMemberById(id)
                                        console.log(member)
                                        return <img key={member._id} className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                    }
                                    )}
                                </div>
                            </div>

                            <div className="labels-container">
                                <span className="fs12">Labels</span>
                                <div className="labels">
                                    {labelsIds.map(id => {
                                        const label = getLabelById(id)
                                        return <span className="label" key={id} style={{ backgroundColor: label.color }}>{label.title}</span>
                                    })}
                                </div>
                            </div>

                            {board.dueDate && <div className="date-container">
                                <span className="fs12">Due date</span>
                                <div className="date">
                                    <input className="checkbox" type="checkbox" />
                                    <input className="date" type="date" />
                                </div>
                            </div>}
                        </div>

                        <div className="description-container">
                            <img className="description-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/description.svg" />
                            <span>Description</span>
                            <textarea className="description" onChange={handleChange} value={description} name="description" />
                        </div>


                        <div className="activity-container">
                            <img className="activity-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/activity.svg" />
                            <span>Activity</span>

                        </div>

                        <button>Submit</button>
                    </section>
                    <section className="task-actions">
                        <span className="add-to-card fs12">
                            Add to card
                        </span>

                        <button className="action" onClick={() => SetAction('members')}><img className="members-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/members.svg" /><span className="action-title">Members</span>
                            {action === 'members' && <TaskAction action="members" task={taskToEdit} board={board} getMemberById={getMemberById} group={group} />}
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="labels-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/labels.svg" /><span className="action-title">Labels</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="checklist-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/checklist.svg" /><span className="action-title">Checklist</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="dates-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/dates.svg" /><span className="action-title">Dates</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="attachment-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/attachment.svg" /><span className="action-title">Attachment</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="location-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/location.svg" /><span className="action-title">Location</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" /><span className="action-title">Cover</span>
                        </button>
                        <button className="action" onClick={() => SetAction()}><img className="custom-fields-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/custom-fields.svg" /><span className="action-title">Custom fields</span>
                        </button>

                    </section>
                </main>
            </form>
            {/* <pre>{JSON.stringify(taskToEdit,null,2)}</pre> */}
        </div >
    )
}

