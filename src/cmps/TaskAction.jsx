import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box } from "@mui/material"

import { cloudinaryService } from "../services/cloudinary.service"

import { updateBoard } from "../store/actions/board.actions"
import { updateTask } from "../store/actions/task.actions"
import { getAverageColorFromAttachment, getBackgroundImages, getUnsplashImages, isLightColor, makeId } from "../services/util.service"

import closeIcon from '../assets/imgs/Icons/close.svg'
import closeDisabledIcon from '../assets/imgs/TaskDetails-icons/close-disabled.svg'
import leftArrowIcon from '../assets/imgs/TaskDetails-icons/left-arrow.svg'
import penIcon from '../assets/imgs/TaskDetails-icons/pen.svg'

export function TaskAction({ action, board, group, task, getMemberById, onSetAction, onRemoveCover, onSetCover, labelToEdit, setLabelToEdit, toggleAddingItem, dueDate, style, attachmentToEdit }) {

    const user = useSelector(storeState => storeState.userModule.user)

    const [checklistInputValue, setChecklistInputValue] = useState('Checklist')
    const [attachmentInputValue, setAttachmentInputValue] = useState(attachmentToEdit ? attachmentToEdit.title : '')
    const [labelInputValue, setLabelInputValue] = useState(labelToEdit ? labelToEdit.title : '')
    const [dueDateToEdit, setDueDateToEdit] = useState(dueDate ? dueDate : getDefaultDueDate());
    const [backgroundImages, setBackgroundImages] = useState([])

    const searchInputRef = useRef()
    const checklistTitleRef = useRef()
    const labelToEditTitleRef = useRef()
    const attachmentTitleRef = useRef()
    const dueDateInputRef = useRef()
    const dueTimeInputRef = useRef()
    const dueDateCheckboxRef = useRef()
    const isFirstRenderRef = useRef(true)

    useEffect(() => {
        if ((action === 'members' || action === 'labels') && isFirstRenderRef.current) {
            searchInputRef.current.focus()
            searchInputRef.current.setSelectionRange(searchInputRef.current.value.length, searchInputRef.current.value.length);
            isFirstRenderRef.current = false
        }
        if (labelToEdit) setLabelInputValue(labelToEdit.title)
        if (labelToEditTitleRef.current) {
            labelToEditTitleRef.current.focus()
            labelToEditTitleRef.current.select()
        }
        if (checklistTitleRef.current) {
            checklistTitleRef.current.focus()
            checklistTitleRef.current.select()
        }
        if (attachmentTitleRef.current) {
            attachmentTitleRef.current.focus()
            attachmentTitleRef.current.select()
        }
        if (action === 'cover') getBackgroundImages().then(images => setBackgroundImages(images.slice(0, 6)))
    }, [])

    useEffect(() => {
        if (action === 'dates') {
            dueDateInputRef.current.value = formatTimestampToDateString(dueDateToEdit)
            dueTimeInputRef.current.value = formatTimestampToTimeString(dueDateToEdit)
            if (isFirstRenderRef.current) {
                dueDateCheckboxRef.current.checked = true
                isFirstRenderRef.current = false
                dueDateInputRef.current.focus()
                dueDateInputRef.current.setSelectionRange(dueDateInputRef.current.value.length, dueDateInputRef.current.value.length);
            }
        }
    }, [dueDateToEdit])

    // Getters

    function getBoardMembers() {
        const boardMembers = board.members.filter(member => !task.membersIds.includes(member._id))
        return boardMembers
    }

    function getTaskMembers() {
        return task.membersIds.map(getMemberById)
    }

    // Members

    async function onAddMember(id) {
        const updatedTask = { ...task }
        updatedTask.membersIds.push(id)
        const activityTitle = `added member (id: ${id}) to task (id: ${task.id})`
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    async function onRemoveMember(id) {
        task = { ...task, membersIds: task.membersIds.filter(mId => mId !== id) }
        await updateTask(task, group, board)
    }

    // Labels

    async function onToggleLabel(ev, id) {
        const { checked } = ev.target
        let updatedTask = { ...task }
        if (checked) {
            updatedTask.labelsIds.push(id)
        } else {
            updatedTask = { ...updatedTask, labelsIds: updatedTask.labelsIds.filter(labelId => labelId !== id) }
        }
        await updateTask(updatedTask, group, board)
    }

    async function onSaveLabel(ev) {
        if (!labelToEdit.color && !labelToEdit.title) return
        let label
        let labels
        if (labelToEdit.id) {
            label = { ...labelToEdit, title: labelInputValue }
            labels = board.labels.map(l => {
                if (l.id !== label.id) return l
                return label
            })
        } else {
            label = { ...labelToEdit, title: labelInputValue, id: 'l' + makeId() }
            labels = [...board.labels]
            labels.push(label)
        }

        const updatedBoard = { ...board, labels }

        await updateBoard(updatedBoard)
        if (!labelToEdit.id) {
            const updatedTaskLabelsIds = [...task.labelsIds]
            updatedTaskLabelsIds.push(label.id)
            await updateTask({ ...task, labelsIds: updatedTaskLabelsIds }, group, updatedBoard)
        }
        onSetAction(ev, null)
    }

    async function onRemoveLabel(ev) {

        const updatedLabels = board.labels.filter(l => l.id !== labelToEdit.id)

        const groups = [...board.groups].map(g => {
            const tasks = [...g.tasks].map(t => {
                const labelsIds = [...t.labelsIds].filter(id => id !== labelToEdit.id)
                return { ...t, labelsIds }
            })
            return { ...g, tasks: tasks }
        })

        const updatedBoard = { ...board, groups, labels: updatedLabels }

        await updateBoard(updatedBoard)
        onSetAction(ev, null)
    }

    function onSetLabelToEditColor({ target }) {
        const color = target.style.backgroundColor
        document.querySelectorAll('.color').forEach(elColor => elColor.classList.remove('selected'))
        target.classList.add('selected')
        setLabelToEdit({ ...labelToEdit, color })
    }

    async function onRemoveLabelToEditColor() {
        document.querySelectorAll('.color').forEach(elColor => elColor.classList.remove('selected'))
        setLabelToEdit({ ...labelToEdit, color: null })
    }

    // Cover

    async function onUpdateCoverColor({ target }) {
        const backgroundColor = target.style.backgroundColor
        const backgroundImage = ''
        const background = { backgroundColor, backgroundImage }
        if (!task.style) {
            task = { ...task, style: { isFull: false, ...background } }
        } else {
            task = { ...task, style: { ...task.style, ...background } }
        }
        await updateTask(task, group, board)
    }

    async function onUpdateCoverIsFull(ev) {
        if (!task.style) return
        const targetName = ev.currentTarget.getAttribute('data-name')
        const isFull = JSON.parse(targetName)
        task = { ...task, style: { ...task.style, isFull } }
        await updateTask(task, group, board)
    }

    // Checklists

    async function onAddChecklist(ev) {
        const updatedTask = { ...task }
        const newChecklist = { id: 'cl' + makeId(), title: checklistInputValue, todos: [] }
        updatedTask.checklists.push(newChecklist)
        const activityTitle = `added ${checklistInputValue} to this card`
        onSetAction(ev, null)
        toggleAddingItem(newChecklist.id)
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    // Attachments

    async function onAddAttachment(ev, isCover) {
        const files = ev.target.files
        const action = !task.style ? 'cover' : null

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const url = await cloudinaryService.uploadImg(file)
            const attachment = {
                title: file.name,
                url,
                createdAt: Date.now(),
                type: file.type
            }
            attachment.backgroundColor = await getAverageColorFromAttachment(attachment)

            let updatedTask = { ...task }

            updatedTask.attachments.push(attachment)
            const activityTitle = `attached ${file.name} to this card`

            if (!updatedTask.style || isCover) {
                updatedTask = { ...updatedTask, style: { isFull: true, backgroundImage: `url(${attachment.url}`, backgroundColor: attachment.backgroundColor } }
                if (isCover) {
                    await updateTask(updatedTask, group, board, activityTitle, user)
                    break
                }
            }
            await updateTask(updatedTask, group, board, activityTitle, user)
        }

        onSetAction(ev, action)
    }

    function onUpload() {
        document.querySelector('.input-file-upload').click()
    }

    async function onUpdateAttachment(ev) {
        const updatedAttachment = { ...attachmentToEdit, title: attachmentInputValue }
        const attachments = task.attachments.map(a => {
            if (a.url !== attachmentToEdit.url) return a
            else return updatedAttachment
        })
        const updatedTask = { ...task, attachments }
        const activityTitle = `updated attachment's link name from ${attachmentToEdit.title} to ${attachmentInputValue} on card (id: ${task.id})`
        onSetAction(ev, null)
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    // Dates

    async function onSaveDueDate(ev) {
        if (!dueDateCheckboxRef.current.checked) {
            console.log('remove')
            onRemoveDueDate(ev)
            return
        }
        const updatedTask = { ...task }
        if (!task.dueDate) updatedTask.isDone = false
        updatedTask.dueDate = dueDateToEdit
        const activityTitle = `changed the due date of task ${updatedTask.id} to ${dueDateToEdit}`
        onSetAction(ev, null)
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    async function onRemoveDueDate(ev) {
        const updatedTask = { ...task }
        updatedTask.dueDate = null
        const activityTitle = `removed the due date of task ${updatedTask.id}`
        onSetAction(ev, null)
        await updateTask(updatedTask, group, board, activityTitle, user)
    }

    function formatTimestampToDateString(timestamp) {
        const date = new Date(timestamp)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()

        return `${month}/${day}/${year}`
    }

    function formatTimestampToTimeString(timestamp) {
        const date = new Date(timestamp)
        let hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12
        const minutesStr = minutes < 10 ? '0' + minutes : minutes

        return `${hours}:${minutesStr} ${ampm}`
    }

    function onBlurDateInput({ target }) {
        const strDate = target.value
        const timestamp = parseDate(strDate)

        if (timestamp) {
            const newDate = new Date(timestamp)
            const currentDate = new Date(dueDateToEdit)

            newDate.setHours(currentDate.getHours())
            newDate.setMinutes(currentDate.getMinutes())
            newDate.setSeconds(currentDate.getSeconds())
            newDate.setMilliseconds(currentDate.getMilliseconds())

            setDueDateToEdit(newDate.getTime())
        } else {
            target.value = formatTimestampToDateString(dueDateToEdit)
        }
    }

    function parseDate(strDate) {
        const dateRegex = /^(0?[1-9]|1[0-2])?\/?(0?[1-9]|[12][0-9]|3[01])\/?(\d{2}|\d{4})$/
        const match = strDate.match(dateRegex)

        if (!match) {
            return null
        }

        let [_, month, day, year] = match

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1
        const currentCentury = Math.floor(currentYear / 100) * 100
        const seventyYearsAgo = currentYear - 70
        const seventyYearsFromNow = currentYear + 70

        if (!month) {
            month = currentMonth.toString()
        }

        if (!day) {
            return null
        }

        if (year.length === 4) {
            // Use the year as is
        } else if (year.length === 2) {
            const fullYear = parseInt(year) + currentCentury
            if (fullYear >= seventyYearsAgo && fullYear <= seventyYearsFromNow) {
                year = fullYear.toString()
            } else {
                year = (fullYear - 100).toString()
            }
        } else if (year.length === 0) {
            year = currentYear.toString()
        } else {
            return null
        }

        const formattedDate = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`

        const dateObj = new Date(formattedDate)

        if (dateObj.getMonth() + 1 !== parseInt(month) || dateObj.getDate() !== parseInt(day) || dateObj.getFullYear() !== parseInt(year)) {
            return null
        }

        return dateObj.getTime()
    }

    function parseTime(strTime) {
        const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3])?(:([0-5]?[0-9]))? ?([APap][Mm]?)?$/
        const match = strTime.match(timeRegex)

        if (!match) {
            return null
        }

        let [_, hour, , minute, period] = match

        if (!hour) {
            return null
        }

        hour = parseInt(hour)
        minute = minute ? parseInt(minute) : 0

        if (period) {
            if (period.toLowerCase() === 'pm' && hour < 12) {
                hour += 12
            } else if (period.toLowerCase() === 'am' && hour === 12) {
                hour = 0
            }
        } else if (hour < 12) {
            period = 'am'
        } else {
            period = 'pm'
        }

        return { hour, minute }
    }

    function onBlurTimeInput({ target }) {
        const strTime = target.value;
        const parsedTime = parseTime(strTime);

        if (parsedTime) {
            const { hour, minute } = parsedTime;
            const currentDate = new Date(dueDateToEdit);

            currentDate.setHours(hour);
            currentDate.setMinutes(minute);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            setDueDateToEdit(currentDate.getTime());
        } else {
            target.value = formatTimestampToTimeString(dueDateToEdit);
        }
    }

    function getDefaultDueDate() {
        const now = new Date()
        const nextDay = new Date(now)
        nextDay.setDate(now.getDate() + 1)
        nextDay.setHours(19, 0, 0, 0)
        return nextDay.getTime()
    }

    return (
        <section className="task-action" onClick={(ev) => ev.stopPropagation()} style={style ? { ...style } : {}}>

            <header className="action-header">
                {action === 'edit label' && <div onClick={(ev) => onSetAction(ev, 'labels')} className="back-container"> <img className="back-action icon" src={leftArrowIcon} /> </div>}
                {action === 'edit label' && !labelToEdit.id ? 'Create label' : (action.charAt(0).toUpperCase() + action.substring(1, action.length))}
                <div onClick={(ev) => onSetAction(ev, null)} className="close-action-container"> <img className="close-action icon" src={closeIcon} /> </div>
            </header>

            {(action === 'members' || action === 'labels') && <input ref={searchInputRef} className="text" placeholder={`Search ${action}`} />}
            {action === 'members' &&
                <>
                    <div className="card-members">
                        <span className="title">Card members</span>
                        {getTaskMembers().map(member => {
                            return (
                                <div key={member._id} className="member card-member" onClick={() => onRemoveMember(member._id)}>
                                    <img className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                    <span className="name">{member.fullname}</span>
                                    <img className="close-icon icon" src={closeIcon} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="board-members">
                        <span className="title">Board members</span>
                        {getBoardMembers().map(member => {
                            return (
                                <div key={member._id} className="member" onClick={() => onAddMember(member._id)}>
                                    <img className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                    <span className="name">{member.fullname}</span>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {action === 'labels' &&
                <>
                    <div className="labels">
                        <span className="title">Labels</span>
                        {board.labels.map(label => {
                            return (
                                <div key={label.id} className="label-container">
                                    <input
                                        id={`label-checkbox-${label.id}`}
                                        className={`label-checkbox ${label.id}`}
                                        type="checkbox"
                                        checked={task.labelsIds.includes(label.id)}
                                        onChange={(ev) => onToggleLabel(ev, label.id)}
                                    />
                                    <label
                                        htmlFor={`label-checkbox-${label.id}`}
                                        className="label"
                                        style={{ backgroundColor: label.color || '#323940', color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}
                                    >
                                        {label.title}
                                    </label>
                                    <div
                                        className="pen-icon-container"
                                        onClick={(ev) => {
                                            setLabelToEdit({ ...label });
                                            onSetAction(ev, 'edit label');
                                        }}
                                    >
                                        <img className="pen-icon" src={penIcon} alt="Edit" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="btn-dark-grey" onClick={(ev) => { setLabelToEdit({ color: '#206e4e' }); onSetAction(ev, 'edit label') }}>Create a new label</button>
                </>
            }
            {action === 'edit label' &&
                <>
                    <div className="label-preview-container flex">
                        <span className="label-preview" style={{ backgroundColor: labelToEdit.color ? labelToEdit.color : '#3a444c', color: isLightColor(labelToEdit.color) ? '#1d2125' : 'currentColor' }}>{labelInputValue}</span>
                    </div>
                    <div className="edit-label">
                        <span className="title">Title</span>
                        <input ref={labelToEditTitleRef} className="text" value={labelInputValue} onChange={(ev) => setLabelInputValue(ev.target.value)} />
                    </div>
                    <div className="colors-container">
                        <span className="title">Select a color</span>
                        <div className="colors">
                            <div className="color" style={{ backgroundColor: '#174b35' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#533f03' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#702e00' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#5d1f1a' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#362c63' }} onClick={onSetLabelToEditColor}></div>
                            <div className={`color ${!labelToEdit.id ? 'selected' : ''}`} style={{ backgroundColor: '#206e4e' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#7f5f02' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#a64700' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#ae2e24' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#5e4db2' }} onClick={onSetLabelToEditColor}></div>

                            <div className="color" style={{ backgroundColor: '#4cce97' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#e1b205' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#fea363' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#f87168' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#9f8fef' }} onClick={onSetLabelToEditColor}></div>

                            <div className="color" style={{ backgroundColor: '#0a326c' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#154555' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#37471f' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#50253f' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#454f59' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#0055cc' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#1f6a83' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#4d6b1f' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#943d73' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#596773' }} onClick={onSetLabelToEditColor}></div>

                            <div className="color" style={{ backgroundColor: '#579dff' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#6cc3e0' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#94c747' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#e774bb' }} onClick={onSetLabelToEditColor}></div>
                            <div className="color" style={{ backgroundColor: '#8c9baa' }} onClick={onSetLabelToEditColor}></div>
                        </div>
                    </div>
                    <button className={`btn-dark-grey flex align-center justify-center ${!labelToEdit.color ? 'btn-disabled' : ''}`} onClick={onRemoveLabelToEditColor}>
                        <img className="icon remove-icon" src={!labelToEdit.color ? closeDisabledIcon : closeIcon} />
                        <span>Remove color</span>
                    </button>
                    <div className="flex space-between">
                        <button className={`btn-blue ${(!labelToEdit.color && !labelInputValue) ? 'btn-disabled' : ''}`} onClick={onSaveLabel}>{!labelToEdit.id ? 'Create' : 'Save'}</button>
                        {labelToEdit.id && <button className="btn-red" onClick={onRemoveLabel}>Delete</button>}
                    </div>
                </>
            }
            {action === 'cover' &&
                <>
                    <div className="size-container">
                        <span className="title">Size</span>
                        <div className="size-btns">
                            <div>
                                <div className="cover-pic">
                                    <div className={`header-cover ${!task.style || task.style?.isFull ? '' : 'focused'}`} data-name="false" onClick={onUpdateCoverIsFull}>
                                        <div className="card-header" style={task.style}>
                                        </div>
                                        <div className="card-body">
                                            <div className="top-line">
                                            </div>
                                            <div className="middle-line">
                                            </div>
                                            <div className="bottom-line">
                                                <div className="left">
                                                </div>
                                                <div className="right">
                                                </div>
                                            </div>
                                            <div className="dot-corner">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body" data-name="true" onClick={onUpdateCoverIsFull} >
                                        <div className={`body-cover ${task.style?.isFull ? 'focused' : ''}`} style={task.style} >
                                            <div className="card-body">
                                                <div className="top-line">

                                                </div>
                                                <div className="middle-line">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {task.style && <button className="remove-cover" onClick={onRemoveCover}>Remove cover</button>}
                    </div>
                    <div className="colors-container">
                        <span className="title">Colors</span>
                        <div className="colors">
                            <div className="color" style={{ backgroundColor: '#206e4e' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#7f5f02' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#a64700' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#ae2e24' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#5e4db2' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#0055cc' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#1f6a83' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#4d6b1f' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#943d73' }} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{ backgroundColor: '#596773' }} onClick={onUpdateCoverColor}></div>
                        </div>
                    </div>
                    {task.attachments && task.attachments.length ?
                        <div className="cover-attachments-container">
                            <span className="title">Attachments</span>
                            <div className="cover-attachments">
                                {task.attachments.map(a =>
                                    <div
                                        key={a.url}
                                        className="cover-attachment"
                                        style={{ backgroundImage: `url(${a.url})`, backgroundColor: a.backgroundColor }}
                                        onClick={() => onSetCover(a)}
                                    />
                                )}
                            </div>
                        </div>
                        : null}
                    <div className="cover-unsplash-container">
                        <span className="title">Photos from Unsplash</span>
                        <div className="unsplash-imgs">
                            {backgroundImages.map(img =>
                                <div
                                    key={img.id}
                                    className="unsplash-img"
                                    style={{ backgroundImage: `url(${img.smallUrl})` }}
                                    onClick={() => onSetCover(img)}
                                />
                            )}
                        </div>
                    </div>
                </>
            }
            {action === 'add checklist' &&
                <>
                    <div className="checklist">
                        <span className="title">Title</span>
                        <input
                            ref={checklistTitleRef}
                            className="text"
                            value={checklistInputValue}
                            onChange={(ev) => setChecklistInputValue(ev.target.value)} />
                    </div>
                    <button className="btn-blue" onClick={onAddChecklist}>Add</button>
                </>
            }
            {(action === 'attach' || action === 'cover') &&
                <>
                    <div className="attachment">
                        {action === 'attach' &&
                            <span className="sub-title">Attach a file from your computer</span>
                        }
                        <input
                            className="input-file-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(ev) => onAddAttachment(ev, (action === 'attach' ? undefined : true))}
                            multiple
                        />
                        <button className="btn-file-upload btn-dark-grey"
                            onClick={onUpload}>
                            {action === 'attach' ? 'Choose a file' : 'Upload a cover image'}
                        </button>
                    </div>
                </>
            }
            {action === 'edit attachment' &&
                <>
                    <div className="edit-attachment">
                        <span className="title">Link name</span>
                        <input
                            ref={attachmentTitleRef}
                            className="text"
                            value={attachmentInputValue}
                            onChange={(ev) => setAttachmentInputValue(ev.target.value)} />
                    </div>
                    <button className="btn-blue" onClick={onUpdateAttachment}>Update</button>
                </>
            }
            {action === 'dates' &&
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
                            <StaticDatePicker
                                value={dayjs(dueDateToEdit)}
                                onChange={(newValue) => {
                                    setDueDateToEdit(newValue);
                                }}
                                sx={{
                                    backgroundColor: 'inherit',
                                    '& .MuiPickersToolbar-root': {
                                        display: 'none',
                                    },
                                    '& .MuiTypography-root': {
                                        color: 'inherit',
                                    },
                                    '& .MuiButtonBase-root': {
                                        color: 'inherit',
                                    },
                                    '& .MuiPickerStaticWrapper-actionBar': {
                                        display: 'none',
                                    },
                                    '& .MuiDialogActions-root': {
                                        display: 'none',
                                    },
                                    '& .MuiPickersDay-root': {
                                        borderRadius: '3px',
                                        '&:hover': {
                                            backgroundColor: '#323940',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: '#1876d2',
                                        },
                                    },
                                    '& .MuiPickersCalendarHeader-root': {
                                        mt: '0',
                                    }
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                    <span className="title" style={{ margin: '0' }}>Due date</span>
                    <div className="due-date">
                        <input ref={dueDateCheckboxRef} className="checkbox" type="checkbox" />
                        <input ref={dueDateInputRef} className="text date-text" type="text" onBlur={onBlurDateInput} />
                        <input ref={dueTimeInputRef} className="text date-text" type="text" onBlur={onBlurTimeInput} />
                    </div>
                    <button className="btn-blue btn-full" onClick={(ev) => onSaveDueDate(ev)}>Save</button>
                    <button className="btn-dark-grey btn-full" onClick={(ev) => onRemoveDueDate(ev)}>Remove</button>
                </>
            }
        </section>
    )
}

