import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board';
import { updateBoard } from '../store/actions/board.actions';
import { updateTask } from '../store/actions/task.actions';
import { TaskAction } from '../cmps/TaskAction';
import autosize from 'autosize';
import { getRandomMember } from '../services/board/board-demo-data.service';
import { getFormattedTime, makeId } from '../services/util.service';

export function TaskDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)

    const textareaRef = useRef(null)
    const textareaCommentRef = useRef(null)
    const dateInputRef = useRef(null)

    const [group, setGroup] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [action, setAction] = useState(null)
    const [isSettingDescription, setIsSettingDescription] = useState(false)
    const [isAddingComment, setIsAddingComment] = useState(false)
    const [tempDescription, setTempDescription] = useState('')
    const [commentToEdit, setCommentToEdit] = useState('')

    const { taskId, groupId, boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBoard()
    }, [])

    useEffect(() => {
        if (board) setTask()
    }, [board])

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current);
        }

        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current);
            }
        }
    }, [taskToEdit, isSettingDescription])

    useEffect(() => {
        if (textareaCommentRef.current) {
            autosize(textareaCommentRef.current);
        }

        return () => {
            if (textareaCommentRef.current) {
                autosize.destroy(textareaCommentRef.current);
            }
        }
    }, [taskToEdit, isSettingDescription])

    async function getBoard() {
        try {
            await boardService.getById(boardId);
        } catch (er) {
            console.log('err: ' + er);
        }
    }

    function setTask() {
        setTaskToEdit(() => {
            const group = board.groups.find(group => group.id === groupId);
            setGroup(group);
            const task = group.tasks.find(task => task.id === taskId);
            return task;
        });
    }

    function onBack() {
        navigate(`/board/${boardId}`, { replace: true });
    }

    function onBackdropClicked() {
        if (action) setAction(null);
        else onBack();
    }

    function onTaskDetailsClicked(ev) {
        ev.stopPropagation();
        setAction(null);
    }

    function onSubmit(ev) {
        ev.preventDefault();
    }

    function handleChange({ target }) {
        const { type, name: field } = target;
        let { value } = target;
        if (type === 'number') {
            value = +value || '';
        }
        setTaskToEdit({ ...taskToEdit, [field]: value });
    }

    function handleCommentChange({ target }) {
        const { type, name: field } = target
        let { value } = target
        if (type === 'number') {
            value = +value || ''
        }
        setCommentToEdit(value)
    }

    function getMemberById(id) {
        return board.members.find(member => member._id === id);
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id);
    }

    function onSetAction(ev, isNull = false) {
        ev.stopPropagation();
        if (isNull) {
            setAction(null);
            return
        }
        const actionName = action === ev.currentTarget.name ? null : ev.currentTarget.name;
        setAction(actionName);
    }

    function startSetDescription() {
        setTempDescription(taskToEdit.description)
        setIsSettingDescription(true)
    }

    async function onSaveDescription() {
        await updateTask(taskToEdit, groupId, group, board)
        setIsSettingDescription(false)

    }

    function cancelSetDescription() {
        taskToEdit.description = tempDescription
        setIsSettingDescription(false)
    }
    async function onSaveComment() {
        const newActivity = {
            id: makeId(),
            group: group,
            task: taskToEdit,
            txt: commentToEdit,
            byMember: getRandomMember(),
            title: 'add comment',
            createdAt: Date.now()
        }
        board.activities.unshift(newActivity)
        setIsAddingComment(false)
        await updateBoard(board)
    }

    async function onChangeDueDate() {
        const dateStr = dateInputRef.current.value
        const dateObj = new Date(dateStr)
        const timestamp = dateObj.getTime()
        taskToEdit.dueDate = timestamp
        await updateTask(taskToEdit, groupId, group, board)

    }

    function getDueDate(timeStamp) {
        if (!timeStamp) return
        const date = new Date(timeStamp)
        const isoString = date.toISOString();
        return isoString.slice(0, 16)
    }

    function onShowDatePicker() {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker()
        }
    }

    function handleCommentKeyUp(ev) {
        if (ev.code === 'Escape') {
            setIsAddingComment(false)
        }
    }

    async function onChangeStatus({ target }) {
        taskToEdit.status = target.checked ? 'done' : 'inProgress';
        await updateTask(taskToEdit, groupId, group, board)
    }

    function getComments(groupId) {
        let comments = board.activities.filter(activity => {
            return activity.title === 'add comment' && activity.group.id === groupId
        })
        if (!comments) return []
        comments = comments.sort((a, b) => b.createdAt - a.createdAt)
        return comments
    }

    if (!taskToEdit || !group) return <section>Loading...</section>;

    const { title, description, membersIds, labelsIds, style: cover } = taskToEdit;

    console.log(taskToEdit)

    return (
        <div className="task-details-backdrop" onClick={onBackdropClicked}>
            <form className="task-details" onSubmit={onSubmit} onClick={onTaskDetailsClicked}>
                <header className="task-header" style={{ ...cover }}>
                    <img className="card-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/card.svg" alt="card icon" />
                    <span className="task-title">{title}</span>
                    <span className="task-in-list fs12">in list <span>{group.title}</span></span>
                    <img onClick={onBackdropClicked} className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" alt="close icon" />
                </header>
                <section className="task-container">
                    <section className="task-content">
                        <div className="members-labels-notifications-date-container">
                            {membersIds.length ? <div className="members-container">
                                <span className="fs12">Members</span>
                                <div className="members-img-container">
                                    {membersIds.map(id => {
                                        const member = getMemberById(id)
                                        return <img key={member._id} className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                    }
                                    )}
                                    <div name="members" onClick={onSetAction} className="add-member-thumbnail"><img src="../../../src/assets/imgs/TaskDetails-icons/add.svg" alt="add plus icon" /></div>
                                </div>
                            </div> : ''}
                            {labelsIds.length ? <div className="labels-container">
                                <span className="fs12">Labels</span>
                                <div className="labels">
                                    {labelsIds && labelsIds.map(id => {
                                        const label = getLabelById(id);
                                        return <span className="label" key={id} style={{ backgroundColor: label.color }}>{label.title}</span>;
                                    })}
                                </div>
                            </div> : ''}

                            {taskToEdit.dueDate && <div className="date-container">
                                <span className="fs12">Due date</span>
                                <div onClick={onShowDatePicker} className="date">
                                    <input
                                        onClick={(ev) => ev.stopPropagation()}
                                        className="checkbox"
                                        type="checkbox"
                                        onChange={onChangeStatus}
                                        checked={taskToEdit.status === 'inProgress' ? false : true}
                                    />
                                    <input
                                        ref={dateInputRef}
                                        className="date-input"
                                        type="datetime-local"
                                        value={getDueDate(taskToEdit.dueDate)}
                                        onChange={onChangeDueDate}
                                    />
                                    <span className='inside-input-status' style={taskToEdit.status === 'inProgress'? {backgroundColor: '#F5CD47'} : {backgroundColor: '#4BCE97'}}>{taskToEdit.status === 'done' ? 'Complete' : 'Due soon'}</span>
                                    <img className="arrow-down" src="../../../src/assets/imgs/TaskDetails-icons/arrow-down.svg" alt="description icon" />
                                </div>
                            </div>}
                        </div>
                        <div className="description-container">
                            <div className="description-title">
                                <img className="description-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/description.svg" alt="description icon" />
                                <span>Description</span>
                                {!isSettingDescription && description.length ? <button onClick={startSetDescription}>Edit</button> : ''}
                            </div>
                            {isSettingDescription ?
                                <>
                                    <textarea
                                        placeholder={`Pro tip: Hit 'Enter' for a line break.`}
                                        className="description editing"
                                        onChange={handleChange}
                                        value={description}
                                        name="description"
                                        ref={textareaRef} />
                                    <article className="btns">
                                        <button onClick={onSaveDescription} className='btn-save'>Save</button>
                                        <button onClick={cancelSetDescription} className='btn-cancel'>Cancel</button>
                                    </article>
                                </>
                                :
                                <textarea
                                    placeholder='Add a more detailed description...'
                                    className={`description ${description.length ? 'has-content' : ''}`}
                                    value={description}
                                    name="description"
                                    ref={textareaRef}
                                    readOnly
                                    onClick={startSetDescription}
                                />
                            }
                        </div>
                        {taskToEdit.attachments.length ?
                            <div className="attachments-container">
                                <img className="attachments-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/paperclip.svg" alt="attachment icon" />
                                <span>Attachments</span>
                            </div>
                            :
                            ''}
                        <div className="activity-container">
                            <div className="activity-title">
                                <img className="activity-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/activity.svg" alt="activity icon" />
                                <span className='activity-title-text'>Activity</span>
                            </div>
                            <div className="input-container">
                                <img className='user-img-activity-input' src="../../../src/assets/imgs/user-imgs/user-img3.jpg" alt="user" />
                                {isAddingComment ?
                                    <>
                                        <textarea
                                            placeholder='Write a comment...'
                                            className="comment editing"
                                            onChange={handleCommentChange}
                                            name="comment"
                                            onKeyUp={handleCommentKeyUp}
                                            ref={textareaCommentRef} />
                                        <article className="btns">
                                            <button onClick={onSaveComment} className='btn-save'>Save</button>
                                        </article>
                                    </>
                                    :
                                    <textarea
                                        placeholder='Write a comment...'
                                        className={`comment`}
                                        name="comment"
                                        ref={textareaCommentRef}
                                        readOnly
                                        onClick={() => { setIsAddingComment(true) }}
                                    />
                                }
                            </div>
                            <div className="comments-container">
                                {getComments(group.id).map(comment =>
                                    <div className="comment-container">
                                        <img className='member-img-comment' src={comment.byMember.imgUrl} alt="" />
                                        <p>{comment.byMember.fullname} <span className='comment-timestamp'>{getFormattedTime(comment.createdAt)}</span></p>
                                        <h1 className='comment-txt'>{comment.txt}</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="task-actions">
                        <span className="add-to-card fs12">Add to card</span>
                        <div className="task-action-container">
                            <button className="action" name="members" onClick={onSetAction}>
                                <img className="members-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/members.svg" alt="members icon" />
                                <span className="action-title">Members</span>
                            </button>
                            {action === 'members' && <TaskAction action="members" task={taskToEdit} board={board} group={group} getMemberById={getMemberById} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="labels" onClick={onSetAction}>
                                <img className="labels-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/labels.svg" alt="labels icon" />
                                <span className="action-title">Labels</span>
                            </button>
                            {action === 'labels' && <TaskAction action="labels" task={taskToEdit} board={board} group={group} getLabelById={getLabelById} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="checklist" onClick={onSetAction}>
                                <img className="checklist-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/checklist.svg" alt="checklist icon" />
                                <span className="action-title">Checklist</span>
                            </button>
                            {action === 'checklist' && <TaskAction action="add checklist" task={taskToEdit} board={board} group={group} />}
                        </div>
                        <div className="task-action-container">

                            <button className="action" name="dates" onClick={onSetAction}>
                                <img className="dates-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/dates.svg" alt="dates icon" />
                                <span className="action-title">Dates</span>
                            </button>
                            {/* Enter task action rendering for date */}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="attachment" onClick={onSetAction}>
                                <img className="attachment-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/attachment.svg" alt="attachment icon" />
                                <span className="action-title">Attachment</span>
                            </button>
                            {action === 'attachment' && <TaskAction action="attach" task={taskToEdit} board={board} group={group} onSetAction={onSetAction} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="location" onClick={onSetAction}>
                                <img className="location-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/location.svg" alt="location icon" />
                                <span className="action-title">Location</span>
                            </button>
                            {/* Enter location action rendering */}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="cover" onClick={onSetAction}>
                                <img className="cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" alt="cover icon" />
                                <span className="action-title">Cover</span>
                            </button>
                            {action === 'cover' && <TaskAction action="cover" task={taskToEdit} board={board} group={group} />}
                        </div>

                        <button className="action" name="custom" onClick={onSetAction}>
                            <img className="custom-fields-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/custom-fields.svg" alt="custom fields icon" />
                            <span className="action-title">Custom fields</span>
                        </button>
                    </section>
                </section>
            </form>
        </div>
    );
}