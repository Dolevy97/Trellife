import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { updateTask } from '../store/actions/task.actions'
import { TaskAction } from '../cmps/TaskAction'
import { getFormattedTime, makeId, onDownloadUrl } from '../services/util.service'
import { updateGroup } from '../store/actions/group.actions'

import autosize from 'autosize'
import ms from 'ms'

export function TaskDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const user = useSelector(storeState => storeState.userModule.user)

    const textareaRef = useRef(null)
    const textareaCommentRef = useRef(null)
    const dateInputRef = useRef(null)
    const checklistItemRefs = useRef({})

    const [group, setGroup] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [action, setAction] = useState(null)
    const [isSettingDescription, setIsSettingDescription] = useState(false)
    const [isAddingComment, setIsAddingComment] = useState(false)

    const [isAddingItems, setIsAddingItems] = useState(null)

    const [isTodoMenuOpen, setIsTodoMenuOpen] = useState(false)
    const [todoMenuId, setTodoMenuId] = useState(null)
    const [todoMenuPosition, setTodoMenuPosition] = useState({})
    const [tempDescription, setTempDescription] = useState('')
    const [commentToEdit, setCommentToEdit] = useState('')
    // const [averageColors, setAverageColors] = useState({})

    const { taskId, groupId, boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setTask()
    }, [board])

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current)
        }

        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current)
            }
        }
    }, [taskToEdit, isSettingDescription])

    useEffect(() => {
        if (textareaCommentRef.current) {
            autosize(textareaCommentRef.current)
        }

        return () => {
            if (textareaCommentRef.current) {
                autosize.destroy(textareaCommentRef.current)
            }
        }
    }, [taskToEdit, isSettingDescription])

    // useEffect(() => {
    //     if (!taskToEdit || !taskToEdit.attachments) return

    //     const loadImages = async () => {
    //         for (const attachment of taskToEdit.attachments) {
    //             if (!averageColors[attachment.url]) {
    //                 try {
    //                     const color = await getAverageColorFromAttachment(attachment)
    //                     setAverageColors(prev => ({ ...prev, [attachment.url]: color }))
    //                 } catch (error) {
    //                     console.error("Error loading image or getting average color:", error)
    //                 }
    //             }
    //         }
    //     }

    //     loadImages()
    // }, [taskToEdit, averageColors])


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

    function onBackdropClicked() {
        if (action) setAction(null)
        else onBack()
    }

    function onTaskDetailsClicked(ev) {
        ev.stopPropagation()
        setAction(null)
    }

    function onSubmit(ev) {
        ev.preventDefault()
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target
        if (type === 'number') {
            value = +value || ''
        }
        setTaskToEdit({ ...taskToEdit, [field]: value })
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
        return board.members.find(member => member._id === id)
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    // Action - Dynamic Component

    function onSetAction(ev, action) {
        ev.stopPropagation()
        if (action !== undefined) {
            setAction(action)
            return
        }
        const actionName = action === ev.currentTarget.name ? null : ev.currentTarget.name
        setAction(actionName)
    }

    // Description

    function startSetDescription() {
        setTempDescription(taskToEdit.description)
        setIsSettingDescription(true)
    }

    async function onSaveDescription() {
        await updateTask(taskToEdit, group, board)
        setIsSettingDescription(false)
    }

    function cancelSetDescription() {
        taskToEdit.description = tempDescription
        setIsSettingDescription(false)
    }

    // Due date

    async function onChangeDueDate() {
        const dateStr = dateInputRef.current.value
        const dateObj = new Date(dateStr)
        const timestamp = dateObj.getTime()
        taskToEdit.dueDate = timestamp
        const activityTitle = `changed the due date of task (id: ${taskToEdit.id}) to ${dateStr}`
        await updateTask(taskToEdit, group, board, activityTitle)

    }

    function getDueDate(timeStamp) {
        if (!timeStamp) return
        const date = new Date(timeStamp)
        const isoString = date.toISOString()
        return isoString.slice(0, 16)
    }

    function onShowDatePicker() {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker()
        }
    }

    async function onChangeIsDone({ target }) {
        taskToEdit.isDone = target.checked
        const activityTitle = 'marked the due date ' + target.checked ? 'complete' : 'incomplete'
        await updateTask(taskToEdit, group, board, activityTitle)
    }

    // Comments

    function getComments(taskId) {
        let comments = board.activities.filter(activity => {
            return activity.title === 'add comment' && activity.task.id === taskId
        })
        if (!comments) return []
        comments = comments.sort((a, b) => b.createdAt - a.createdAt)
        return comments
    }

    async function onDeleteComment(commentId) {
        const updatedTask = { ...taskToEdit }
        const commentIdx = board.activities.findIndex(activity => activity.id === commentId)
        board.activities.splice(commentIdx, 1)
        await updateBoard(board)
    }

    async function onSaveComment() {
        const newActivity = {
            id: makeId(),
            group: group,
            task: taskToEdit,
            txt: commentToEdit,
            byMember: user,
            title: 'add comment',
            createdAt: Date.now()
        }
        const updatedBoard = { ...board }
        updatedBoard.activities.unshift(newActivity)
        await updateBoard(updatedBoard)
        setIsAddingComment(false)
    }

    function handleCommentKeyUp(ev) {
        if (ev.code === 'Escape') {
            setIsAddingComment(false)
        }
    }

    // Remove task

    async function onRemoveTask() {
        const newTasks = group.tasks.filter(task => task.id !== taskToEdit.id)
        const newGroup = { ...group, tasks: newTasks }
        // const activityTitle = `removed task (id: ${taskToEdit.id})`
        // NEED TO REFACTOR updateGroup SO IT UPDATES THE ACTIVITIES OF THE BOARD
        await updateGroup(newGroup.id, newGroup, board)
        onBackdropClicked()
    }

    // Checklist

    function getDonePercentage(checklist) {
        const completedTodos = checklist.todos.filter(todo => todo.isDone).length
        const todosLengthPercent = (completedTodos / checklist.todos.length) * 100
        if (isNaN(todosLengthPercent)) return 0
        return todosLengthPercent.toFixed(0)
    }

    function handleChecklistKeyDown(ev, checklist) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            onAddItem(checklist)
        }
    }

    async function onAddItem(checklist) {
        const textareaElement = checklistItemRefs.current[checklist.id];
        if (!textareaElement || !textareaElement.value.trim()) return

        const newTodo = {
            id: makeId(),
            title: textareaElement.value.trim(),
            isDone: false
        }

        const checklistIndex = taskToEdit.checklists.findIndex(check => check.id === checklist.id)

        if (checklistIndex !== -1) {
            taskToEdit.checklists[checklistIndex].todos.push(newTodo)
        }

        await updateTask(taskToEdit, group, board)

        textareaElement.value = ''
    }

    function toggleAddingItem(checklistId) {
        setIsAddingItems(prevIsAddingItems => {
            if (prevIsAddingItems === checklistId) {
                if (checklistItemRefs.current[checklistId]) {
                    checklistItemRefs.current[checklistId].value = ''
                }
                return null;
            } else {
                if (prevIsAddingItems && checklistItemRefs.current[prevIsAddingItems]) {
                    checklistItemRefs.current[prevIsAddingItems].value = ''
                }
                return checklistId;
            }
        });
    }

    async function onDeleteChecklist(checklistId) {
        const checklistIndex = taskToEdit.checklists.findIndex(checklist => checklist.id === checklistId)
        taskToEdit.checklists.splice(checklistIndex, 1)
        await updateTask(taskToEdit, group, board)
    }

    function onClickMenu(ev, taskId) {
        ev.stopPropagation()
        const rect = ev.target.getBoundingClientRect()
        setTodoMenuPosition({ top: rect.bottom, left: rect.left })
        setTodoMenuId(taskId)
        setIsTodoMenuOpen(true)
    }

    async function onDeleteTodo(ev, checklist) {
        if (!todoMenuId) return
        ev.stopPropagation()

        const updatedTask = { ...taskToEdit }
        const checklistIndex = updatedTask.checklists.findIndex(check => check.id === checklist.id)

        if (checklistIndex !== -1) {
            updatedTask.checklists = [...updatedTask.checklists]
            updatedTask.checklists[checklistIndex] = {
                ...updatedTask.checklists[checklistIndex],
                todos: updatedTask.checklists[checklistIndex].todos.filter(todo => todo.id !== todoMenuId)
            }
        }

        await updateTask(updatedTask, group, board)
        setIsTodoMenuOpen(false)
    }

    async function onChangeTodo({ target }, todo, checklist) {
        const updatedTask = { ...taskToEdit }
        const checklistIndex = updatedTask.checklists.findIndex(check => check.id === checklist.id)

        if (checklistIndex !== -1) {
            const todoIndex = updatedTask.checklists[checklistIndex].todos.findIndex(t => t.id === todo.id)

            if (todoIndex !== -1) {
                updatedTask.checklists[checklistIndex].todos[todoIndex].isDone = target.checked
            }
        }

        await updateTask(updatedTask, group, board)
    }

    function onFocusOnComment() {
        setIsAddingComment(true)
        textareaCommentRef.current.focus()
        textareaCommentRef.current.setSelectionRange(textareaCommentRef.current.value.length, textareaCommentRef.current.value.length);
    }

    // Attachment
    async function onRemoveAttachment(attachment) {
        const updatedTask = { ...taskToEdit }
        if (isCover(attachment)) updatedTask.style = null
        const attachments = updatedTask.attachments.filter(a => a.url !== attachment.url)
        const activity = `deleted the ${attachment.title} from card (id: ${updatedTask.id})`
        updateTask({ ...updatedTask, attachments }, group, board, activity)
    }

    function onAddAttachment() {

    }

    function getAddedAt(createdAt) {
        const timestamp = (createdAt - Date.now()) * -1
        return 'Added ' + (ms(timestamp, { long: true })) + ' ago'
    }

    // Cover
    async function onRemoveCover() {
        const task = { ...taskToEdit, style: null }
        await updateTask(task, group, board)
    }

    function isCover(attachment) {
        const coverImg = taskToEdit.style?.backgroundImage
        return (coverImg && coverImg.substring(4, coverImg.length - 1) === attachment.url)
    }

    async function onSetCover(attachment) {
        const updatedTask = { ...taskToEdit, style: { ...taskToEdit.style, backgroundImage: `url(${attachment.url})`, backgroundColor: attachment.backgroundColor } }
        const activityTitle = `set ${attachment.title} as a cover for task (id: ${updatedTask.id})`
        await updateTask(updatedTask, group, board, activityTitle)
    }

    // console.log(taskToEdit)
    // console.log(taskToEdit.attachments[1])

    if (!taskToEdit || !group) return null

    const { title, description, membersIds, labelsIds, style } = taskToEdit

    const taskActionProps = { task: taskToEdit, board, group, onSetAction }
    console.log('style: ', style)

    return (
        <div className="task-details-backdrop" onClick={onBackdropClicked}>
            <form
                className="task-details"
                onSubmit={onSubmit}
                onClick={onTaskDetailsClicked}
            // style={style ? ({ marginBlockStart: style?.backgroundImage ? '117px' : '71px' }) : {}}
            >
                <img onClick={onBackdropClicked} className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close-white.svg" alt="close icon" />
                {style && <div className="task-details-cover" style={{ ...style, height: style.backgroundImage ? '160px' : '' }}>
                    {style &&
                        <div className="task-header-action-container">
                            <button className="action" name="cover" onClick={onSetAction}>
                                <img className="cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" alt="cover icon" />
                                <span className="action-title">Cover</span>
                            </button>
                            {action === 'cover' && <TaskAction action="cover" onSetCover={onSetCover} onRemoveCover={onRemoveCover} {...taskActionProps} />}
                        </div>
                    }
                </div>}
                <header className="task-header">
                    <img className="card-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/card.svg" alt="card icon" />
                    <span className="task-title">{title}</span>
                    <span className="task-in-list fs14">in list <span style={{ textDecoration: 'underline' }}>{group.title}</span></span>
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
                                        const label = getLabelById(id)
                                        return <span className="label" key={id} style={{ backgroundColor: label.color }}>{label.title}</span>
                                    })}
                                </div>
                            </div> : ''}

                            {taskToEdit.dueDate && <div className="date-container">
                                <span className="fs12">Due date</span>
                                <section className="due-date-inner-container">
                                    <input
                                        onClick={(ev) => ev.stopPropagation()}
                                        className="checkbox-due-date"
                                        type="checkbox"
                                        onChange={onChangeIsDone}
                                        checked={taskToEdit.isDone}
                                    />
                                    <div onClick={onShowDatePicker} className="date">
                                        <input
                                            ref={dateInputRef}
                                            className="date-input"
                                            type="datetime-local"
                                            value={getDueDate(taskToEdit.dueDate)}
                                            onChange={onChangeDueDate}
                                        />
                                        <span className='inside-input-is-done' style={!taskToEdit.isDone ? { backgroundColor: '#F5CD47' } : { backgroundColor: '#4BCE97' }}>{taskToEdit.isDone ? 'Complete' : 'Due soon'}</span>
                                        <img className="arrow-down" src="../../../src/assets/imgs/TaskDetails-icons/arrow-down.svg" alt="description icon" />
                                    </div>
                                </section>
                            </div>}

                        </div>
                        <div className="description-container">
                            <div className="description-title">
                                <img className="description-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/description.svg" alt="description icon" />
                                <span>Description</span>
                                {!isSettingDescription && description.length ?
                                    <button onClick={startSetDescription}>Edit</button>
                                    : ''}
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

                        {taskToEdit.attachments && taskToEdit.attachments.length ?
                            <div className="attachments-container">

                                <div className='attachments-title'>

                                    <img className="attachments-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/paperclip.svg" alt="attachment icon" />
                                    <span>Attachments</span>

                                    <button onClick={onAddAttachment} style={{ cursor: 'not-allowed' }}>Add</button>
                                </div>
                                <div className="attachments">
                                    {taskToEdit.attachments.map(a =>
                                        <div key={a.url} className="attachment">
                                            {a.type.slice(0, 5) === 'image' ?
                                                <a
                                                    href={a.url}
                                                    className="attachment-thumbnail"
                                                    style={{
                                                        backgroundImage: `url(${a.url})`,
                                                        backgroundColor: a.backgroundColor || 'transparent'
                                                    }}
                                                />
                                                :
                                                <div className="attachment-file-preview">
                                                    <p>{a.type.split('/')[1] === 'x-zip-compressed' ? 'zip' : a.type.split('/')[1]}</p>
                                                </div>
                                            }
                                            <div className="attachment-details">
                                                <div className="attachment-header">
                                                    <span className="attachment-title">{a.title}</span>
                                                    {/* ADD LINK ARROW HERE */}
                                                </div>
                                                <div className="attachment-main">
                                                    <span className="attachment-added-at">
                                                        {getAddedAt(a.createdAt)}
                                                    </span>
                                                    <article className="attachment-link" onClick={onFocusOnComment}><span className='attachment-link-text'>Comment</span></article>
                                                    {a.type.slice(0, 5) === 'image' &&
                                                        <article className="attachment-link" onClick={() => onDownloadUrl(a.url, a.title)}><span className='attachment-link-text'>Download</span></article>}
                                                    <article className="attachment-link" onClick={() => onRemoveAttachment(a)}><span className='attachment-link-text'>Delete</span></article>
                                                    <article className="attachment-link" name="edit-attachment" onClick={onSetAction} style={{ cursor: 'not-allowed' }}><span className='attachment-link-text'>Edit</span></article>
                                                </div>
                                                {a.type.slice(0, 5) === 'image' &&
                                                    <div className="attachment-set-remove-cover">
                                                        <img className="attachment-set-remove-cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" alt="cover icon" />
                                                        <span className="attachment-span-set-remove-cover"
                                                            onClick={isCover(a) ? onRemoveCover : () => onSetCover(a)}>
                                                            {(isCover(a) ? 'Remove' : 'Make') + ' cover'}
                                                        </span>
                                                    </div>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            ''}
                        {taskToEdit.checklists && taskToEdit.checklists.length ?
                            <div className="checklists-container">
                                {taskToEdit.checklists.length ? taskToEdit.checklists.map(checklist => {
                                    return (
                                        <div className="checklist-container" key={checklist.id}>
                                            <div className="checklist-title-container">
                                                <img className="checklists-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/checklist.svg" alt="attachment icon" />
                                                <span className='checklist-title'>{checklist.title}</span>
                                                <button onClick={() => onDeleteChecklist(checklist.id)} className='btn-delete-checklist'>Delete</button>
                                            </div>
                                            <div className="checklist-progress">
                                                <span className='progress-percentage'>{getDonePercentage(checklist)}%</span>
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-bar-current"
                                                        style={{
                                                            width: `${getDonePercentage(checklist)}%`,
                                                            backgroundColor: getDonePercentage(checklist) > 99.9 ? '#4BCE97' : undefined,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="checklist-items">
                                                {checklist.todos ? checklist.todos.map(todo => (
                                                    <div className="checklist-item-container" key={todo.id}>
                                                        <div className="checklist-item-checkbox">
                                                            <input
                                                                className='item-checkbox'
                                                                type="checkbox"
                                                                name="item-checklist"
                                                                checked={todo.isDone}
                                                                onChange={(ev) => { onChangeTodo(ev, todo, checklist) }} />
                                                        </div>
                                                        <div
                                                            className="checklist-item-details"
                                                            style={todo.isDone ? { textDecoration: 'line-through' } : {}}>
                                                            <div className="todo-actions">
                                                                <div className="action-container">
                                                                    <img onClick={(ev) => onClickMenu(ev, todo.id)} src="../../../src/assets/imgs/TaskDetails-icons/3dots.svg" alt="" />
                                                                </div>
                                                            </div>
                                                            <span className='todo-title'>{todo.title}</span>
                                                        </div>
                                                    </div>
                                                )) : ''}

                                                {isTodoMenuOpen && todoMenuPosition && (
                                                    <article
                                                        className="item-actions"
                                                        style={{
                                                            position: 'fixed',
                                                            top: `${todoMenuPosition.top + 10}px`,
                                                            left: `${todoMenuPosition.left - 5}px`,
                                                            right: 'auto',
                                                            bottom: 'auto'
                                                        }}>
                                                        <header className="item-actions-header">
                                                            <h2>Item actions</h2>
                                                            <button><img onClick={() => setIsTodoMenuOpen(false)} src="../../../src/assets/imgs/TaskDetails-icons/close.svg" alt="" /></button>
                                                        </header>
                                                        <div className="item-actions-body">
                                                            <button onClick={(ev) => onDeleteTodo(ev, checklist)} className='item-action'>Delete</button>
                                                        </div>
                                                    </article>
                                                )}
                                            </div>

                                            <div className="add-item-container">
                                                {isAddingItems === checklist.id ? (
                                                    <>
                                                        <textarea
                                                            className='new-checklist-item'
                                                            ref={(el) => checklistItemRefs.current[checklist.id] = el}
                                                            placeholder='Add an item'
                                                            onKeyDown={(ev) => handleChecklistKeyDown(ev, checklist)}
                                                        ></textarea>
                                                        <div className="checklist-add-controls">
                                                            <button onClick={() => onAddItem(checklist)} className='btn-add'>Add</button>
                                                            <button onClick={() => toggleAddingItem(checklist.id)} className='btn-cancel'>Cancel</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <button onClick={() => toggleAddingItem(checklist.id)} className="btn-add-item">
                                                        Add an item
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }) : ''}
                            </div>
                            :
                            ''}
                        <div className="activity-container">
                            <div className="activity-title">
                                <img className="activity-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/activity.svg" alt="activity icon" />
                                <span className='activity-title-text'>Activity</span>
                            </div>
                            <div className="input-container">
                                <img
                                    className='user-img-activity-input'
                                    src={user.imgUrl || ''}
                                    alt="user image" />
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
                                            <button onClick={onSaveComment} className='btn-save' disabled={textareaCommentRef.current.value ? false : true}>Save</button>
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
                                {console.log(getComments(taskToEdit.id))}
                                {getComments(taskToEdit.id).map(comment =>
                                    <div className="comment-container" key={comment.id}>
                                        <img className='member-img-comment' src={comment.byMember.imgUrl} alt="" />
                                        <p>{comment.byMember.fullname} <span className='comment-timestamp'>{getFormattedTime(comment.createdAt)}</span></p>
                                        <h1 className='comment-txt'>{comment.txt}</h1>
                                        <article className="comment-reactions">
                                            {user && user._id === comment.byMember._id &&
                                                <span class="edit-and-delete">
                                                    <span class="comment-reaction-button">Edit</span>
                                                    <span class="sep">•</span>
                                                    <span onClick={() => onDeleteComment(comment.id)} class="comment-reaction-button">Delete</span>
                                                </span>}
                                        </article>
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
                            {action === 'members' && <TaskAction action="members" getMemberById={getMemberById} {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="labels" onClick={onSetAction}>
                                <img className="labels-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/labels.svg" alt="labels icon" />
                                <span className="action-title">Labels</span>
                            </button>
                            {action === 'labels' && <TaskAction action="labels" getLabelById={getLabelById} {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="checklist" onClick={onSetAction}>
                                <img className="checklist-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/checklist.svg" alt="checklist icon" />
                                <span className="action-title">Checklist</span>
                            </button>
                            {action === 'checklist' && <TaskAction action="add checklist" {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">

                            <button className="action" name="dates" onClick={onSetAction} style={{ cursor: 'not-allowed' }}>
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
                            {action === 'attachment' && <TaskAction action="attach" {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button className="action" name="location" onClick={onSetAction} style={{ cursor: 'not-allowed' }}>
                                <img className="location-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/location.svg" alt="location icon" />
                                <span className="action-title">Location</span>
                            </button>
                            {/* Enter location action rendering */}
                        </div>
                        {!taskToEdit.style &&
                            <div className="task-action-container">
                                <button className="action" name="cover" onClick={onSetAction}>
                                    <img className="cover-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/cover.svg" alt="cover icon" />
                                    <span className="action-title">Cover</span>
                                </button>
                                {action === 'cover' && <TaskAction action="cover" onSetCover={onSetCover} onRemoveCover={onRemoveCover} {...taskActionProps} />}
                            </div>
                        }

                        <hr className='sidebar-hr' />

                        <button className="action remove-task" onClick={onRemoveTask}>
                            <img className="icon" src="../../../src/assets/imgs/TaskDetails-icons/trash.svg" alt="close icon" />
                            <span className="action-title">Remove card</span>
                        </button>

                    </section>
                </section>
            </form>
        </div >
    )
}