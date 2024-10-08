import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { updateTask } from '../store/actions/task.actions'
import { TaskAction } from '../cmps/TaskAction'
import { getFormattedTime, isLightColor, makeId, onDownloadUrl } from '../services/util.service'
import { updateGroup } from '../store/actions/group.actions'

import autosize from 'autosize'
import ms from 'ms'

import closeWhiteIcon from '../assets/imgs/TaskDetails-icons/close-white.svg'
import closeDarkIcon from '../assets/imgs/TaskDetails-icons/close-dark.svg'
import coverWhiteIcon from '../assets/imgs/TaskDetails-icons/cover-white.svg'
import coverDarkIcon from '../assets/imgs/TaskDetails-icons/cover-dark.svg'
import cardIcon from '../assets/imgs/TaskDetails-icons/card.svg'
import addMemberIcon from '../assets/imgs/TaskDetails-icons/add.svg'
import arrowDownIcon from '../assets/imgs/TaskDetails-icons/arrow-down.svg'
import descriptionIcon from '../assets/imgs/TaskDetails-icons/description.svg'
import attachmentIcon from '../assets/imgs/TaskDetails-icons/paperclip.svg'
import coverIcon from '../assets/imgs/TaskDetails-icons/cover.svg'
import checklistIcon from '../assets/imgs/TaskDetails-icons/checklist.svg'
import closeIcon from '../assets/imgs/TaskDetails-icons/close.svg'
import dotsIcon from '../assets/imgs/TaskDetails-icons/3dots.svg'
import activityIcon from '../assets/imgs/TaskDetails-icons/activity.svg'
import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelsIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import datesIcon from '../assets/imgs/TaskDetails-icons/dates.svg'
import attachmentIcon2 from '../assets/imgs/TaskDetails-icons/attachment.svg'
import locationIcon from '../assets/imgs/TaskDetails-icons/location.svg'
import trashIcon from '../assets/imgs/TaskDetails-icons/trash.svg'

export function TaskDetails() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const user = useSelector(storeState => storeState.userModule.user)

    const textareaRef = useRef(null)
    const textareaCommentRef = useRef(null)
    const editCommentRef = useRef(null)
    const editTodoItemRef = useRef(null);

    const checklistItemRefs = useRef({})

    const [group, setGroup] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [action, setAction] = useState(null)
    const [actionPosition, setActionPosition] = useState(null)
    const [isSettingDescription, setIsSettingDescription] = useState(false)
    const [isAddingComment, setIsAddingComment] = useState(false)

    const [isAddingItems, setIsAddingItems] = useState(null)

    const [isTodoMenuOpen, setIsTodoMenuOpen] = useState(false)
    const [todoMenuId, setTodoMenuId] = useState(null)
    const [todoMenuPosition, setTodoMenuPosition] = useState({})
    const [tempDescription, setTempDescription] = useState('')
    const [commentToEdit, setCommentToEdit] = useState('')
    const [labelToEdit, setLabelToEdit] = useState(null)

    const [isEditingComment, setIsEditingComment] = useState(false)
    const [editCommentInputValue, setEditCommentInputValue] = useState('')

    const [editingItemIds, setEditingItemIds] = useState({})
    const [editItemTitleValue, setEditItemTitleValue] = useState('')
    const [editingTodoId, setEditingTodoId] = useState(null);

    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [taskTitleInputValue, setTaskTitleInputValue] = useState(taskToEdit?.title || '')

    const { taskId, groupId, boardId } = useParams()
    const navigate = useNavigate()

    const menuRef = useRef(null)

    useEffect(() => {
        setTask()
    }, [board])

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current)
        }
        if (textareaCommentRef.current) {
            autosize(textareaCommentRef.current)
        }
        if (editCommentRef.current) {
            autosize(editCommentRef.current)
        }

        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current)
            }

            if (textareaCommentRef.current) {
                autosize.destroy(textareaCommentRef.current)
            }

            if (editCommentRef.current) {
                autosize.destroy(editCommentRef.current)
            }
        }
    }, [taskToEdit, isSettingDescription, editCommentInputValue])


    useEffect(() => {
        if (isAddingItems && checklistItemRefs.current[isAddingItems]) {
            checklistItemRefs.current[isAddingItems].focus()
        }
    }, [isAddingItems])

    useEffect(() => {
        if (editingTodoId && editTodoItemRef.current) {
            const textarea = editTodoItemRef.current
            textarea.focus()

            const length = textarea.value.length
            textarea.setSelectionRange(length, length)

        }
    }, [editingTodoId])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    function handleClickOutside(ev) {
        if (menuRef.current && !menuRef.current.contains(ev.target)) {
            setIsTodoMenuOpen(false)
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

    function onBackdropClicked() {
        if (action) setAction(null)
        else onBack()
    }

    function onTaskDetailsClicked(ev) {
        ev.stopPropagation()
        setAction(null)
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
        const { type } = target
        let { value } = target
        if (type === 'number') {
            value = +value || ''
        }
        setCommentToEdit(value)
    }

    function handleEditCommentChange({ target }) {
        const { value } = target
        setEditCommentInputValue(value)
    }

    function handleItemEditTitle({ target }) {
        const { value } = target
        setEditItemTitleValue(value)
    }

    function getMemberById(id) {
        return board.members.find(member => member._id === id)
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    // Action - Dynamic Component

    function onSetAction(ev, act, position = actionPosition) {
        ev.stopPropagation()
        const actionName = action === act && actionPosition === position ? null : act
        setAction(actionName)
        setActionPosition(position)
    }

    // Description

    function startSetDescription(ev) {
        setTempDescription(taskToEdit.description)
        setIsSettingDescription(true)
    }

    async function onSaveDescription() {
        setIsSettingDescription(false)
        await updateTask(taskToEdit, group, board)
    }

    function cancelSetDescription() {
        taskToEdit.description = tempDescription
        setIsSettingDescription(false)
    }

    // Due date

    function getDueDate(timestamp) {
        if (!timestamp) return
        const date = new Date(timestamp)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = months[date.getMonth()]
        const day = date.getDate()
        let hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes
        return `${month} ${day}, ${hours}:${minutesStr} ${ampm}`
    }

    async function onChangeIsDone({ target }) {
        taskToEdit.isDone = target.checked
        const activityTitle = 'marked the due date ' + target.checked ? 'complete' : 'incomplete'
        await updateTask(taskToEdit, group, board, activityTitle, user)
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
        setIsAddingComment(false)
        await updateBoard(updatedBoard)
    }

    async function onStartEditComment(comment) {
        setEditCommentInputValue(comment.txt)
        setIsEditingComment(true)
    }

    function handleCommentKeyUp(ev) {
        if (ev.code === 'Escape') {
            setIsAddingComment(false)
        }
    }

    function onFocusOnComment() {
        setIsAddingComment(true)
        textareaCommentRef.current.focus()
        textareaCommentRef.current.setSelectionRange(textareaCommentRef.current.value.length, textareaCommentRef.current.value.length)
    }

    async function onSaveEdittedComment(commentId) {
        const commentIdx = board.activities.findIndex(activity => activity.id === commentId)
        board.activities[commentIdx].txt = editCommentInputValue
        setIsEditingComment(false)
        await updateBoard(board)
    }

    // Remove task

    async function onRemoveTask() {
        const newTasks = group.tasks.filter(task => task.id !== taskToEdit.id)
        const newGroup = { ...group, tasks: newTasks }
        const activityTitle = `removed card ${taskToEdit.id}`
        await updateGroup(newGroup.id, newGroup, board, activityTitle)
        onBackdropClicked()
    }

    // Checklists

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
        const textareaElement = checklistItemRefs.current[checklist.id]
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
        textareaElement.value = ''
        await updateTask(taskToEdit, group, board)
    }

    function toggleAddingItem(checklistId) {
        setIsAddingItems(prevIsAddingItems => {
            if (prevIsAddingItems === checklistId) {
                if (checklistItemRefs.current[checklistId]) {
                    checklistItemRefs.current[checklistId].value = ''
                }
                return null
            } else {
                if (prevIsAddingItems && checklistItemRefs.current[prevIsAddingItems]) {
                    checklistItemRefs.current[prevIsAddingItems].value = ''
                }
                return checklistId
            }
        })
        closeAllEditingItems()
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

        setIsTodoMenuOpen(false)
        await updateTask(updatedTask, group, board)
    }

    async function onChangeTodo({ target }, todo, checklist) {
        const updatedTask = { ...taskToEdit }
        const checklistIndex = updatedTask.checklists.findIndex(check => check.id === checklist.id)
        let todoIndex = -1

        if (checklistIndex !== -1) {
            todoIndex = updatedTask.checklists[checklistIndex].todos.findIndex(t => t.id === todo.id)

            if (todoIndex !== -1) {
                updatedTask.checklists[checklistIndex].todos[todoIndex].isDone = target.checked
                setTaskToEdit(updatedTask)
            }
        }

        try {
            await updateTask(updatedTask, group, board)
        } catch (err) {
            console.error("Failed to update task:", err)
            if (checklistIndex !== -1 && todoIndex !== -1) {
                const revertedTask = { ...taskToEdit }
                revertedTask.checklists[checklistIndex].todos[todoIndex].isDone = !target.checked
                setTaskToEdit(revertedTask)
            }
        }
    }

    function startEditingItem(todoId, todoTitle) {
        setEditingItemIds(prev => {
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = false
                return acc
            }, {})

            newState[todoId] = true
            return newState
        })
        setEditItemTitleValue(todoTitle)
        setEditingTodoId(todoId)
        setIsAddingItems(null)
    }

    async function saveEditedItem(todo, checklist) {
        const updatedTask = { ...taskToEdit }
        const checklistIndex = updatedTask.checklists.findIndex(c => c.id === checklist.id)
        const todoIndex = updatedTask.checklists[checklistIndex].todos.findIndex(t => t.id === todo.id)
        updatedTask.checklists[checklistIndex].todos[todoIndex].title = editItemTitleValue

        await updateTask(updatedTask, group, board)
        closeAllEditingItems()
    }

    function closeAllEditingItems() {
        setEditingItemIds({})
        setEditingTodoId(null)
    }

    function handleKeyDown(e, todo, checklist) {
        if (e.key === 'Escape') {
            closeAllEditingItems()
        } else if (e.key === 'Enter') {
            e.preventDefault()
            saveEditedItem(todo, checklist)
        }
    }

    // Attachment
    async function onRemoveAttachment(attachment) {
        const updatedTask = { ...taskToEdit }
        if (isCover(attachment)) updatedTask.style = null
        const attachments = updatedTask.attachments.filter(a => a.url !== attachment.url)
        const activity = `deleted the ${attachment.title} from card ${updatedTask.id}`
        updateTask({ ...updatedTask, attachments }, group, board, activity, user)
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
        const activityTitle = `set ${attachment.title} as a cover for card ${updatedTask.id}`
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    //Task title

    function handleTitleClick() {
        setIsEditingTitle(true)
        setTaskTitleInputValue(taskToEdit.title)
    }

    function handleTitleBlur() {
        handleTitleUpdate()
    }

    function handleTitleKeyPress(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            handleTitleUpdate()
        }
    }

    async function handleTitleUpdate() {
        let titleToSet = taskTitleInputValue.trim()
        if (titleToSet === '' || titleToSet === taskToEdit.title) {
            setTaskTitleInputValue(taskToEdit.title)
            setIsEditingTitle(false)
            return
        }

        const updatedTask = { ...taskToEdit, title: titleToSet }
        try {
            await updateTask(updatedTask, group, board, `Changed task title to "${titleToSet}"`, user)
            setIsEditingTitle(false)
        } catch (error) {
            console.error('Failed to update task title:', error)
            setTaskTitleInputValue(taskToEdit.title)
        }
    }

    function getTaskStatus(task) {
        if (task.isDone) {
            return {
                text: 'Complete',
                style: { backgroundColor: '#4BCE97' }
            };
        }

        if (!task.dueDate) {
            return null
        }

        const now = new Date()
        const dueDate = new Date(task.dueDate)
        const timeDiff = dueDate - now
        const dayInMilliseconds = 24 * 60 * 60 * 1000

        if (timeDiff < -dayInMilliseconds) {
            return {
                text: 'Overdue',
                style: { backgroundColor: '#42221F', color: '#FD9891' }
            }
        } else if (timeDiff < 0) {
            return {
                text: 'Overdue',
                style: { backgroundColor: '#F87168' }
            }
        } else if (timeDiff <= dayInMilliseconds) {
            return {
                text: 'Due soon',
                style: { backgroundColor: '#F5CD47' }
            }
        }

        return { text: '', style: {} }
    }


    if (!taskToEdit || !group) return null

    const { title, description, membersIds, labelsIds, style } = taskToEdit

    const taskActionProps = { task: taskToEdit, board, group, onSetAction }

    const taskStatus = getTaskStatus(taskToEdit)

    return (
        <div className="task-details-backdrop" onClick={onBackdropClicked}>
            <section className="task-details" onClick={onTaskDetailsClicked}>
                <img onClick={onBackdropClicked} className={`close-icon icon ${isLightColor(style?.backgroundColor) ? 'dark' : 'light'}`} src={isLightColor(style?.backgroundColor) ? closeDarkIcon : closeWhiteIcon} alt="close icon" />
                {style &&
                    <div className="task-details-cover" style={{ ...style, height: style.backgroundImage ? '160px' : '' }}>
                        {style &&
                            <div className="task-header-action-container">
                                <button className={`action ${isLightColor(style?.backgroundColor) ? 'dark' : 'light'}`} onClick={(ev) => onSetAction(ev, 'cover', 2)}>
                                    <img className="cover-icon icon" src={isLightColor(style?.backgroundColor) ? coverDarkIcon : coverWhiteIcon} alt="cover icon" />
                                    <span className="action-title" style={{ color: isLightColor(style?.backgroundColor) ? '#182a4e' : 'currentColor' }}>Cover</span>
                                </button>
                                {action === 'cover' && actionPosition === 2
                                    && <TaskAction action="cover" onSetCover={onSetCover} onRemoveCover={onRemoveCover} {...taskActionProps} />}
                            </div>
                        }
                    </div>}
                <header className="task-header">
                    <img className="card-icon icon" src={cardIcon} alt="card icon" />
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={taskTitleInputValue}
                            onChange={(ev) => setTaskTitleInputValue(ev.target.value)}
                            onBlur={handleTitleBlur}
                            onKeyPress={handleTitleKeyPress}
                            autoFocus
                        />
                    ) : (
                        <span className="task-title" onClick={handleTitleClick}>{title}</span>
                    )}
                    <span className="task-in-list fs14">in list <span style={{ textDecoration: 'underline' }}>{group.title}</span></span>
                </header>
                <section className="task-container">
                    <section className="task-content">
                        <div className="members-labels-notifications-date-container">

                            {membersIds.length ?
                                <div className="members-container">
                                    <span className="fs12">Members</span>
                                    <div className="members-img-container">
                                        {membersIds.map(id => {
                                            const member = getMemberById(id)
                                            return <img key={member._id} className="task-member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                        }
                                        )}
                                        <div onClick={(ev) => onSetAction(ev, 'members', 2)} className="add-member-thumbnail"><img className="add-member-icon" src={addMemberIcon} alt="add plus icon" />
                                        </div>
                                    </div>
                                    {action === 'members' && actionPosition === 2
                                        && <TaskAction action="members" getMemberById={getMemberById} {...taskActionProps} style={{ top: '61px' }} />}
                                </div> : ''}

                            {labelsIds.length ?
                                <div className="labels-container">
                                    <span className="fs12">Labels</span>
                                    <div className="labels">
                                        {labelsIds && labelsIds.map(id => {
                                            const label = getLabelById(id)
                                            if (!label) return null
                                            return <span
                                                onClick={(ev) => onSetAction(ev, 'labels', 2)}
                                                className="label" key={id}
                                                style={{ backgroundColor: label.color ? label.color : '#3a444c', color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}>
                                                {label.title}
                                            </span>
                                        })}
                                        <div onClick={(ev) => onSetAction(ev, 'labels', 2)} className="add-label-thumbnail"><img className="add-label-icon" src={addMemberIcon} alt="add plus icon" />
                                        </div>
                                    </div>
                                    {action === 'labels' && actionPosition === 2
                                        && <TaskAction action="labels" {...taskActionProps} setLabelToEdit={setLabelToEdit} style={{ top: '61px' }} />}
                                    {action === 'edit label' && actionPosition === 2
                                        && <TaskAction action="edit label" labelToEdit={labelToEdit} setLabelToEdit={setLabelToEdit} {...taskActionProps} style={{ top: '61px' }} />}
                                </div> : ''}

                            {taskToEdit.dueDate &&
                                <div onClick={(ev) => onSetAction(ev, 'dates', 2)} className="date-container">
                                    <span className="fs12">Due date</span>
                                    <section className="due-date-inner-container">
                                        <input
                                            onClick={(ev) => ev.stopPropagation()}
                                            className="checkbox-due-date"
                                            type="checkbox"
                                            onChange={onChangeIsDone}
                                            checked={taskToEdit.isDone}
                                        />
                                        <div className="date">
                                            <span className="date-span">{getDueDate(taskToEdit.dueDate)}</span>
                                            <span className='inside-input-is-done' style={taskStatus.style}>{taskStatus.text}</span>
                                            <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                                        </div>
                                    </section>
                                    {action === 'dates' && actionPosition === 2
                                        && <TaskAction action="dates" {...taskActionProps} dueDate={taskToEdit.dueDate} style={{ top: '63px', left: '20px' }} />}
                                </div>}

                        </div>
                        <div className="description-container">
                            <div className="description-title">
                                <img className="description-icon icon" src={descriptionIcon} alt="description icon" />
                                <span>Description</span>
                                {!isSettingDescription && description.length ?
                                    <button type='button' onClick={startSetDescription}>Edit</button>
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
                                        <button type='button' onClick={onSaveDescription} className='btn-save'>Save</button>
                                        <button type='button' onClick={cancelSetDescription} className='btn-cancel'>Cancel</button>
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
                                    <img className="attachments-icon icon" src={attachmentIcon} alt="attachment icon" />
                                    <span>Attachments</span>
                                    <button onClick={(ev) => onSetAction(ev, 'attachment', 2)}>Add</button>
                                    {action === 'attachment' && actionPosition === 2
                                        && <TaskAction action="attach" {...taskActionProps} style={{ top: '45px', right: '-254px' }} />}
                                </div>
                                <div className="attachments">
                                    {taskToEdit.attachments.map((a, i) =>
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
                                                    <article className="attachment-link" onClick={(ev) => onSetAction(ev, 'edit attachment', i)} style={{ position: 'relative' }}><span className='attachment-link-text'>Edit</span>
                                                        {action === 'edit attachment' && actionPosition === i
                                                            && <TaskAction action="edit attachment" {...taskActionProps} style={{ left: '12px', top: '22px' }} attachmentToEdit={a} />}
                                                    </article>
                                                </div>
                                                {a.type.slice(0, 5) === 'image' &&
                                                    <div className="attachment-set-remove-cover">
                                                        <img className="attachment-set-remove-cover-icon icon" src={coverIcon} alt="cover icon" />
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
                            : ''}
                        {taskToEdit.checklists && taskToEdit.checklists.length ?
                            <div className="checklists-container">
                                {taskToEdit.checklists.length ?
                                    taskToEdit.checklists.map(checklist =>
                                        <div className="checklist-container" key={checklist.id}>
                                            <div className="checklist-title-container">
                                                <img className="checklists-icon icon" src={checklistIcon} alt="attachment icon" />
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
                                                    <div className={`checklist-item-container ${editingItemIds[todo.id] ? 'editing' : ''}`} key={todo.id}>
                                                        <div className="checklist-item-checkbox">
                                                            <input
                                                                className='item-checkbox'
                                                                type="checkbox"
                                                                name="item-checklist"
                                                                checked={todo.isDone}
                                                                onChange={(ev) => { onChangeTodo(ev, todo, checklist) }} />
                                                        </div>
                                                        {editingItemIds[todo.id] ?
                                                            <>
                                                                <textarea
                                                                    ref={editTodoItemRef}
                                                                    className='edit-checklist-item-title'
                                                                    onChange={handleItemEditTitle}
                                                                    value={editItemTitleValue}
                                                                    onKeyDown={(e) => handleKeyDown(e, todo, checklist)}
                                                                ></textarea>
                                                                <article className="btns">
                                                                    <button type='button' onClick={() => saveEditedItem(todo, checklist)} className='btn-save'>Save</button>
                                                                    <img onClick={closeAllEditingItems} src={closeIcon} alt="close icon" />
                                                                </article>
                                                            </>

                                                            :
                                                            <div
                                                                onClick={() => startEditingItem(todo.id, todo.title)}
                                                                className="checklist-item-details"
                                                                style={todo.isDone ? { textDecoration: 'line-through' } : {}}>
                                                                <div className="todo-actions">
                                                                    <div className="action-container">
                                                                        <img onClick={(ev) => onClickMenu(ev, todo.id)} src={dotsIcon} alt="dots icon" />
                                                                    </div>
                                                                </div>
                                                                <span className='todo-title'>{todo.title}</span>
                                                            </div>}
                                                    </div>
                                                )) : ''}

                                                {isTodoMenuOpen && todoMenuPosition && (
                                                    <article
                                                        ref={menuRef}
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
                                                            <button><img onClick={() => setIsTodoMenuOpen(false)} src={closeIcon} alt="" /></button>
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
                                        </div>)
                                    : ''}
                            </div>
                            :
                            ''}
                        <div className="activity-container">
                            <div className="activity-title">
                                <img className="activity-icon icon" src={activityIcon} alt="activity icon" />
                                <span className='activity-title-text'>Activity</span>
                            </div>
                            <div className="input-container">
                                <img
                                    className='user-img-activity-input'
                                    src={user && user.imgUrl || 'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg'}
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
                                {getComments(taskToEdit.id).map(comment =>
                                    <div className="comment-container" key={comment.id}>
                                        <img className='member-img-comment' src={comment.byMember.imgUrl} alt="" />
                                        <p>{comment.byMember.fullname} <span className='comment-timestamp'>{getFormattedTime(comment.createdAt)}</span></p>
                                        {isEditingComment ?
                                            <>
                                                <textarea
                                                    ref={editCommentRef}
                                                    className='edit-comment'
                                                    onChange={handleEditCommentChange}
                                                    value={editCommentInputValue}
                                                ></textarea>
                                                <article className="btns">
                                                    <button disabled={!editCommentInputValue} type='button' onClick={() => onSaveEdittedComment(comment.id)} className='btn-save'>Save</button>
                                                    <button type='button' onClick={() => setIsEditingComment(false)} className='btn-cancel'>Discard changes</button>
                                                </article>
                                            </>
                                            :
                                            <h1 className='comment-txt'>{comment.txt}</h1>
                                        }
                                        <article className="comment-reactions">
                                            {user && user._id === comment.byMember._id && !isEditingComment &&
                                                <span className="edit-and-delete">
                                                    <span onClick={() => onStartEditComment(comment)} className="comment-reaction-button">Edit</span>
                                                    <span className="sep">•</span>
                                                    <span onClick={() => onDeleteComment(comment.id)} className="comment-reaction-button">Delete</span>
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
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'members', 1)}>

                                <img className="members-icon icon" src={membersIcon} alt="members icon" />
                                <span className="action-title">Members</span>
                            </button>
                            {action === 'members' && actionPosition === 1
                                && <TaskAction action="members" getMemberById={getMemberById} {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'labels', 1)}>
                                <img className="labels-icon icon" src={labelsIcon} alt="labels icon" />
                                <span className="action-title">Labels</span>
                            </button>
                            {action === 'labels' && actionPosition === 1
                                && <TaskAction action="labels" {...taskActionProps} setLabelToEdit={setLabelToEdit} />}
                            {action === 'edit label' && actionPosition === 1
                                && <TaskAction action="edit label" labelToEdit={labelToEdit} setLabelToEdit={setLabelToEdit} {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'checklist')}>
                                <img className="checklist-icon icon" src={checklistIcon} alt="checklist icon" />
                                <span className="action-title">Checklist</span>
                            </button>
                            {action === 'checklist'
                                && <TaskAction action="add checklist" toggleAddingItem={toggleAddingItem} {...taskActionProps} />}
                        </div>
                        <div className="task-action-container">
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'dates', 1)}>
                                <img className="dates-icon icon" src={datesIcon} alt="dates icon" />
                                <span className="action-title">Dates</span>
                            </button>
                            {action === 'dates' && actionPosition === 1
                                && <TaskAction action="dates" {...taskActionProps} dueDate={taskToEdit.dueDate} />}
                        </div>
                        <div className="task-action-container">
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'attachment', 1)}>
                                <img className="attachment-icon icon" src={attachmentIcon2} alt="attachment icon" />
                                <span className="action-title">Attachment</span>
                            </button>
                            {action === 'attachment' && actionPosition === 1
                                && <TaskAction action="attach" {...taskActionProps} />}
                        </div>
                        {/* <div className="task-action-container">
                            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'location')} style={{ cursor: 'not-allowed' }}>
                                <img className="location-icon icon" src={locationIcon} alt="location icon" />
                                <span className="action-title">Location</span>
                            </button>
                            Enter location action rendering
                        </div> */}
                        {!taskToEdit.style
                            &&
                            <div className="task-action-container">
                                <button type='button' className="action" name="cover" onClick={(ev) => onSetAction(ev, 'cover', 1)}>
                                    <img className="cover-icon icon" src={coverIcon} alt="cover icon" />
                                    <span className="action-title">Cover</span>
                                </button>
                                {action === 'cover' && actionPosition === 1
                                    && <TaskAction action="cover" onSetCover={onSetCover} onRemoveCover={onRemoveCover} {...taskActionProps} />}
                            </div>
                        }

                        <hr className='sidebar-hr' />

                        <button className="action remove-task" onClick={onRemoveTask}>
                            <img className="icon" src={trashIcon} alt="trash icon" />
                            <span className="action-title">Delete card</span>
                        </button>

                    </section>
                </section>
            </section>
        </div >
    )
}