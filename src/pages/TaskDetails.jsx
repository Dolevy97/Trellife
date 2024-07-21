import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board';
import { updateBoard } from '../store/actions/board.actions';
import { updateTask } from '../store/actions/task.actions';
import { TaskAction } from '../cmps/TaskAction';
import autosize from 'autosize';

export function TaskDetails() {
    const textareaRef = useRef(null)
    const board = useSelector(storeState => storeState.boardModule.board);
    const [group, setGroup] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [action, setAction] = useState(null);
    const [isSettingDescription, setIsSettingDescription] = useState(false)
    const { taskId, groupId, boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBoard();
    }, []);

    useEffect(() => {
        if (board) setTask();
    }, [board]);

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current);
        }

        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current);
            }
        }
    }, [taskToEdit])

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

    function getMemberById(id) {
        return board.members.find(member => member._id === id);
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id);
    }

    function onSetAction(ev) {
        ev.stopPropagation();
        const actionName = action === ev.currentTarget.name ? null : ev.currentTarget.name;
        setAction(actionName);
    }

    if (!taskToEdit || !group) return <section>Loading...</section>;

    const { title, description, membersIds, labelsIds } = taskToEdit;

    return (
        <div className="task-details-backdrop" onClick={onBackdropClicked}>
            <form className="task-details" onSubmit={onSubmit} onClick={onTaskDetailsClicked}>
                <header className="task-header">
                    <img className="card-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/card.svg" alt="card icon" />
                    <span className="task-title">{title}</span>
                    <span className="task-in-list fs12">in list <span>{group.title}</span></span>
                    <img className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" alt="close icon" />
                </header>
                <main className="task-main">
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
                                </div>
                            </div> : ''}
                            {labelsIds.length ? <div className="labels-container">
                                <span className="fs12">Labels</span>
                                <div className="labels">
                                    {labelsIds.map(id => {
                                        const label = getLabelById(id);
                                        return <span className="label" key={id} style={{ backgroundColor: label.color }}>{label.title}</span>;
                                    })}
                                </div>
                            </div> : ''}

                            {board.dueDate && <div className="date-container">
                                <span className="fs12">Due date</span>
                                <div className="date">
                                    <input className="checkbox" type="checkbox" />
                                    <input className="date" type="date" />
                                </div>
                            </div>}
                        </div>
                        <div className="description-container">
                            <img className="description-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/description.svg" alt="description icon" />
                            <span>Description</span>
                            <textarea
                                placeholder='Add a more detailed description...'
                                className="description"
                                onChange={handleChange}
                                value={description}
                                name="description"
                                ref={textareaRef} />
                        </div>
                        <div className="activity-container">
                            <img className="activity-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/activity.svg" alt="activity icon" />
                            <span>Activity</span>
                        </div>
                        <button>Submit</button>
                    </section>
                    <section className="task-actions">
                        <span className="add-to-card fs12">Add to card</span>
                        <button className="action" name="members" onClick={onSetAction}>
                            <img className="members-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/members.svg" alt="members icon" />
                            <span className="action-title">Members</span>
                            {action === 'members' && <TaskAction action="members" task={taskToEdit} board={board} getMemberById={getMemberById} group={group} />}
                        </button>
                        <button className="action" name="labels" onClick={onSetAction}>
                            <img className="labels-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/labels.svg" alt="labels icon" />
                            <span className="action-title">Labels</span>
                            {action === 'labels' && <TaskAction action="labels" task={taskToEdit} board={board} getLabelById={getLabelById} group={group} />}
                        </button>
                        <button className="action" name="checklist" onClick={onSetAction}>
                            <img className="checklist-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/checklist.svg" alt="checklist icon" />
                            <span className="action-title">Checklist</span>
                        </button>
                        <button className="action" name="dates" onClick={onSetAction}>
                            <img className="dates-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/dates.svg" alt="dates icon" />
                            <span className="action-title">Dates</span>
                        </button>
                        <button className="action" name="attachment" onClick={onSetAction}>
                            <img className="attachment-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/attachment.svg" alt="attachment icon" />
                            <span className="action-title">Attachment</span>
                        </button>
                        <button className="action" name="location" onClick={onSetAction}>
                            <img className="location-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/location.svg" alt="location icon" />
                            <span className="action-title">Location</span>
                        </button>
                        <button className="action" name="cover" onClick={onSetAction}>
                            <img className="cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" alt="cover icon" />
                            <span className="action-title">Cover</span>
                        </button>
                        <button className="action" name="custom" onClick={onSetAction}>
                            <img className="custom-fields-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/custom-fields.svg" alt="custom fields icon" />
                            <span className="action-title">Custom fields</span>
                        </button>
                    </section>
                </main>
            </form>
        </div>
    );
}