import React, { useEffect, useRef, useState } from "react"
import { getFormattedShortTime, isLightColor } from "../services/util.service"

import clockIcon from '../assets/imgs/Icons/clock.svg'
import arrowDownIcon from '../assets/imgs/Icons/arrow-down.svg'
import closeIcon from '../assets/imgs/Icons/close.svg'
import successIcon from '../assets/imgs/Icons/vIcon.svg'
import penIcon from '../assets/imgs/Icons/pen.svg'
import addIcon from '../assets/imgs/Icons/add.svg'

import { useNavigate } from "react-router"
import { addTask, updateTask } from "../store/actions/task.actions"
import { useSelector } from "react-redux"
import { updateBoard } from "../store/actions/board.actions"
import { TaskAction } from "./TaskAction"

export function TableView({ groups, board }) {

    const user = useSelector(storeState => storeState.userModule.user)

    const [isSortOpen, setIsSortOpen] = useState(false)
    const [isAdding, setIsAdding] = useState({ state: false, type: null })

    const [sortState, setSortState] = useState({ isSorting: false, dir: null })
    const [nameChangeOpen, setNameChangeOpen] = useState({ isOpen: false, taskId: null })
    const [changeListOpen, setChangeListOpen] = useState({ isOpen: false, taskId: null })
    const [action, setAction] = useState({ action: null, taskId: null, position: null })

    const [containerPosition, setContainerPosition] = useState({ top: 0, left: 0 })
    const [newListPos, setNewListPos] = useState(null)
    const [newListTitle, setNewListTitle] = useState('')
    const [newCardTitle, setNewCardTitle] = useState('')

    const navigate = useNavigate()

    const nameChangeRef = useRef(null)
    const newCardTitleRef = useRef(null)
    const dropdownRef = useRef(null)

    const options = []
    board.groups.map((g, idx) => options.push(idx + 1))

    const cardOptions = []
    board.groups.map(g => cardOptions.push(g))

    const [newCardList, setNewCardList] = useState(cardOptions[0] || '')

    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0] || 1)
    const [selectedCardOption, setSelectedCardOption] = useState(cardOptions[0] || {})


    useEffect(() => {
        function handleClickOutside(event) {
            if (nameChangeOpen.isOpen && !event.target.closest('.name-change-container')) {
                setNameChangeOpen({ isOpen: false, taskId: null })
            }
            if (changeListOpen.isOpen && !event.target.closest('.change-list-container')) {
                setChangeListOpen({ isOpen: false, taskId: null })
            }

            if (isSortOpen && !event.target.closest('.table-sort-container') && !event.target.closest('.due-date')) {
                setIsSortOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [nameChangeOpen.isOpen, isSortOpen, changeListOpen.isOpen, action])


    useEffect(() => {
        function handleClickOutside(event) {
            if (action.action && !event.target.closest('.task-action-contain')) {
                setAction({ action: null, taskId: null, position: null })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [action])


    // Custom Select

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }

    function handleOptionClick(option) {
        setSelectedOption(option)
        setIsOpen(false)
        setNewListPos(option)
    }

    function handleCardOptionClick(option) {
        setSelectedCardOption(option)
        setIsOpen(false)
        setNewCardList(option)
    }

    /* Set Action */
    function onSetAction(ev, act, taskId, height) {
        ev.stopPropagation()
        if (action.action === act && action.taskId === taskId) {
            setAction({ action: null, taskId: null, position: null })
        } else {
            const position = calculateActionPosition(ev, height, 300)
            setAction({ action: act, taskId: taskId, position: position })
        }
    }

    function getLabelById(id) {
        return board.labels.find(label => label.id === id)
    }

    function getMemberById(id) {
        const member = board.members.find(member => member._id === id)
        return member || {
            _id: 'unknown',
            imgUrl: 'path/to/default/image.png',
            fullname: 'Unknown Member'
        }
    }

    function calculateActionPosition(event, containerHeight, containerWidth) {
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        const rect = event.target.getBoundingClientRect()

        let top, left = rect.left

        if (viewportHeight - rect.bottom >= containerHeight) {
            top = rect.bottom
        } else {
            top = rect.top - containerHeight
        }

        if (left + containerWidth > viewportWidth) {
            left = viewportWidth - containerWidth
        }

        return { top, left }
    }

    function calculatePosition(event, containerHeight) {
        const viewportHeight = window.innerHeight
        const spaceBelow = viewportHeight - event.clientY
        const spaceAbove = event.clientY

        let top, left = event.clientX

        if (spaceBelow >= containerHeight || spaceBelow > spaceAbove) {
            top = event.clientY
        } else {
            top = event.clientY - containerHeight
        }

        return { top, left }
    }

    function getTaskStatus(task) {
        if (!task.dueDate) {
            return null
        }

        const now = new Date()
        const dueDate = new Date(task.dueDate)
        const timeDiff = dueDate - now
        const dayInMilliseconds = 24 * 60 * 60 * 1000

        if (task.isDone) {
            return {
                title: 'This card is complete.',
                style: { backgroundColor: '#4BCE97' },
                textColor: '#1d2125',
                iconFilter: 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)'
            }
        } else if (timeDiff < -dayInMilliseconds) {
            // Overdue by more than a day
            return {
                title: 'This card is past due.',
                style: { backgroundColor: '#42221F' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }
        } else if (timeDiff < 0) {
            // Overdue by less than a day
            return {
                title: 'This card is recently overdue!',
                style: { backgroundColor: '#F87462' },
                textColor: '#ffffff',
                iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }
        } else if (timeDiff <= dayInMilliseconds) {
            return {
                title: 'This card is due soon.',
                style: { backgroundColor: '#F5CD47' },
                textColor: '#1d2125',
                iconFilter: 'none'
            }
        }

        return {
            title: 'This card is due later.',
            style: {},
            textColor: '',
            iconFilter: 'none'
        }
    }

    function onOpenDueDateSort(e) {
        e.stopPropagation()
        setIsSortOpen(prevsort => !prevsort)
    }

    function onChangeSort(dir) {
        if (dir === sortState.dir) {
            setSortState({ isSorting: false, dir: null })
        } else {
            setSortState({ isSorting: true, dir })
        }
    }

    function sortTasks(tasks, dir) {
        return [...tasks].sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1

            const dateA = new Date(a.dueDate)
            const dateB = new Date(b.dueDate)
            return dir * (dateA - dateB)
        })
    }

    async function onUpdateTitle(group, task) {
        const updatedTask = { ...task, title: nameChangeRef.current.value }
        try {
            setNameChangeOpen({ isOpen: false, taskId: null })
            await updateTask(updatedTask, group, board, `Changed task title to "${nameChangeRef.current.value}"`, user)
        } catch (error) {
            console.error('Failed to update task title:', error)
        }
    }

    function handleTaskClick(groupId, taskId, ev) {
        ev.stopPropagation()
        navigate(`/board/${board._id}/${groupId}/${taskId}`, { replace: true })
    }

    async function onChangeTaskGroup(task, newGroupId) {
        const currentGroup = board.groups.find(g => g.tasks.some(t => t.id === task.id))
        const newGroup = board.groups.find(g => g.id === newGroupId)

        const updatedCurrentGroup = {
            ...currentGroup,
            tasks: currentGroup.tasks.filter(t => t.id !== task.id)
        }

        const updatedNewGroup = {
            ...newGroup,
            tasks: [...newGroup.tasks, task]
        }

        const updatedBoard = {
            ...board,
            groups: board.groups.map(g =>
                g.id === currentGroup.id ? updatedCurrentGroup :
                    g.id === newGroup.id ? updatedNewGroup : g
            )
        }
        try {
            setChangeListOpen({ isOpen: false, taskId: null })
            await updateBoard(updatedBoard)
            await updateTask(task, updatedNewGroup, updatedBoard, `Moved task ${task.id} to ${newGroup.id}`, user)
        } catch (error) {
            console.error('Failed to change task group:', error)
        }
    }

    async function onChangeIsDone({ target }, group, task) {
        task.isDone = target.checked
        const activityTitle = 'marked the due date ' + target.checked ? 'complete' : 'incomplete'
        await updateTask(task, group, board, activityTitle, user)
    }

    async function onAddList() {
        if (!newListTitle.trim()) return

        try {
            const newGroup = boardService.getEmptyGroup()
            newGroup.title = newListTitle.trim()
            board.groups.splice(newListPos, 0, newGroup)
            setNewListTitle('')
            setIsAdding({ state: false, type: null })
            await updateBoard(board)
        } catch (err) {
            console.error('Failed to add list:', err)
        }
    }

    async function onAddCard() {

        try {
            setIsAdding({ state: false, type: null })
            await addTask(newCardTitle, newCardList, board, user)
        } catch (err) {
            console.error('Failed to add card:', err)
        }

    }

    return (
        <section className="table-outside-container">
            <section className="table-container">
                <table className="table-view">
                    <thead className="table-header">
                        <tr>
                            <th className="short-width"></th>
                            <th className="long-width">Card</th>
                            <th className="mid-width">List</th>
                            <th className="mid-width">Labels</th>
                            <th className="mid-width">Members</th>
                            <th
                                className="mid-width due-date"
                                onClick={onOpenDueDateSort}
                                style={isSortOpen ? { backgroundColor: '#1C2B41', color: '#579DFF' } : {}}
                            >Due date
                                <img
                                    className="arrow-down-icon"
                                    style={isSortOpen ? { filter: 'brightness(0) saturate(100%) invert(59%) sepia(52%) saturate(2874%) hue-rotate(192deg) brightness(99%) contrast(105%)' } : {}}
                                    src={arrowDownIcon}
                                    alt="arrow down icon" />
                                {isSortOpen &&
                                    <article className="table-sort-container" onClick={(e) => e.stopPropagation()}>
                                        <header className="sort-header">
                                            <h1 className="header-title">Due date</h1>
                                            <div className="btn-close-container">
                                                <img className="btn-close" src={closeIcon}></img>
                                            </div>
                                        </header>
                                        <article className="sort-body">
                                            <h4>Sorting</h4>
                                            <div
                                                className="btn-sort-option"
                                                onClick={() => onChangeSort(1)}>
                                                Sort ascending
                                                <img
                                                    src={successIcon}
                                                    className="success-icon"
                                                    style={{
                                                        opacity: sortState.dir === 1 ? 1 : 0,
                                                        filter: sortState.dir === 1 ? 'invert(86%) sepia(18%) saturate(190%) hue-rotate(171deg) brightness(89%) contrast(86%)' : ''
                                                    }}
                                                    alt="" />
                                            </div>
                                            <div
                                                className="btn-sort-option"
                                                onClick={() => onChangeSort(-1)}>
                                                Sort descending
                                                <img
                                                    src={successIcon}
                                                    className="success-icon"
                                                    style={{
                                                        opacity: sortState.dir === -1 ? 1 : 0,
                                                        filter: sortState.dir === -1 ? 'invert(86%) sepia(18%) saturate(190%) hue-rotate(171deg) brightness(89%) contrast(86%)' : ''
                                                    }}
                                                    alt="" />
                                            </div>
                                        </article>
                                    </article>}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {groups.map(group => {
                            const tasksToRender = sortState.isSorting
                                ? sortTasks(group.tasks, sortState.dir)
                                : group.tasks

                            return tasksToRender.map(task => {
                                const taskActionProps = { task, group, board, user, onClose: () => setAction(null) }
                                const taskStatus = getTaskStatus(task)
                                return (
                                    <tr key={task.id}>
                                        <td className="short-width">
                                            <svg className="grab-icon" width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fillRule="evenodd"><circle cx="10" cy="8" r="1"></circle><circle cx="14" cy="8" r="1"></circle><circle cx="10" cy="16" r="1"></circle><circle cx="14" cy="16" r="1"></circle><circle cx="10" cy="12" r="1"></circle><circle cx="14" cy="12" r="1"></circle></g></svg>
                                        </td>
                                        <td
                                            onClick={(e) => handleTaskClick(group.id, task.id, e)}
                                            className="long-width task-title">{task.title}
                                            <img className="task-title-pen-icon" src={penIcon}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    const position = calculatePosition(e, 200)
                                                    setContainerPosition(position)
                                                    setNameChangeOpen({ isOpen: true, taskId: task.id })
                                                }}
                                                alt=""
                                            />
                                            {nameChangeOpen.isOpen && nameChangeOpen.taskId === task.id &&
                                                <article className="name-change-container"
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{
                                                        position: 'fixed',
                                                        top: `${containerPosition.top}px`,
                                                        left: `${containerPosition.left}px`,
                                                    }}
                                                >
                                                    <header className="name-change-header">
                                                        <h1 className="header-title">Change name</h1>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setNameChangeOpen({ isOpen: false, taskId: null })
                                                            }}
                                                            className="btn-close-container">
                                                            <img className="btn-close" src={closeIcon}></img>
                                                        </div>
                                                    </header>
                                                    <div className="name-change-body">
                                                        <textarea
                                                            defaultValue={task.title}
                                                            className="name-change-textarea"
                                                            ref={nameChangeRef}
                                                        ></textarea>
                                                        <button onClick={() => onUpdateTitle(group, task)} className="btn-save">Save</button>
                                                    </div>
                                                </article>}
                                        </td>
                                        <td
                                            className={`mid-width table-list-td ${changeListOpen.isOpen && changeListOpen.taskId === task.id ? 'change-list-open' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                const position = calculatePosition(e, 300)
                                                setContainerPosition(position)
                                                setChangeListOpen({ isOpen: true, taskId: task.id })
                                            }}
                                        >{group.title}
                                            <img className="arrow-down-icon" src={arrowDownIcon} alt="" />
                                            {changeListOpen.isOpen && changeListOpen.taskId === task.id &&
                                                <article className="change-list-container"
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{
                                                        position: 'fixed',
                                                        top: `${containerPosition.top}px`,
                                                        left: `${containerPosition.left}px`,
                                                    }}
                                                >
                                                    <header className="change-list-header">
                                                        <h1 className="header-title">Change list</h1>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setChangeListOpen({ isOpen: false, taskId: null })
                                                            }}
                                                            className="btn-close-container">
                                                            <img className="btn-close" src={closeIcon}></img>
                                                        </div>
                                                    </header>
                                                    <article className="change-list-body">
                                                        <h4>{board.title}</h4>
                                                        {board.groups && board.groups.map(g =>
                                                            <div
                                                                onClick={() => onChangeTaskGroup(task, g.id)}
                                                                className="btn-list-option">
                                                                {g.title}
                                                                <img
                                                                    src={successIcon}
                                                                    className="success-icon"
                                                                    style={{
                                                                        opacity: group.id === g.id ? 1 : 0,
                                                                        filter: group.id === g.id ? 'invert(86%) sepia(18%) saturate(190%) hue-rotate(171deg) brightness(89%) contrast(86%)' : ''
                                                                    }}
                                                                    alt="success icon" />
                                                            </div>
                                                        )}
                                                    </article>
                                                </article>
                                            }
                                        </td>
                                        <td className="mid-width labels-list-td"
                                            onClick={(e) => onSetAction(e, 'labels', task.id, 371)}
                                        >
                                            <div className="labels-container">
                                                {task.labelsIds && task.labelsIds.map(id => {
                                                    const label = getLabelById(id)
                                                    return label?.color && (
                                                        <React.Fragment key={id}>

                                                            <div
                                                                className={`table-label-tab`}
                                                                title={label.title}>
                                                                <div
                                                                    className="label-color"
                                                                    style={{ backgroundColor: label.color }}
                                                                >
                                                                    <span className="label-title" style={{ color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}>{label.title}</span>
                                                                </div>
                                                            </div>
                                                            <img className="arrow-down-icon-labels" src={arrowDownIcon} alt="" />
                                                        </React.Fragment>
                                                    )
                                                })}
                                                {!task.labelsIds.length &&
                                                    <div className="td-empty-content">
                                                        <div className="table-no-content"></div>
                                                        <div className="td-add-content">
                                                            <img src={addIcon} alt="plus add icon" />
                                                        </div>
                                                    </div>}
                                                {action && action.action === 'labels' && action.taskId === task.id &&
                                                    <div className="task-action-contain"
                                                        style={{
                                                            position: 'fixed',
                                                            top: `${action.position.top}px`,
                                                            left: `${action.position.left}px`,
                                                        }}
                                                    >
                                                        <TaskAction
                                                            action="labels"
                                                            getLabelById={getLabelById}
                                                            {...taskActionProps}
                                                            onSetAction={onSetAction}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                        <td className="mid-width members-td"
                                            onClick={(e) => onSetAction(e, 'members', task.id, 289)}
                                        >
                                            {task.membersIds && task.membersIds.length ? (
                                                <>
                                                    {task.membersIds
                                                        .map(getMemberById)
                                                        .filter(member => member._id !== 'unknown')
                                                        .map((member, idx, members) => (
                                                            <img
                                                                key={member._id}
                                                                className="member-thumbnail"
                                                                src={member.imgUrl}
                                                                title={member.fullname}
                                                                alt={member.fullname}
                                                                style={{ zIndex: members.length - idx }}
                                                            />
                                                        ))}
                                                    <img className="arrow-down-icon-members" src={arrowDownIcon} alt="" />
                                                </>
                                            ) : null}
                                            {!task.membersIds.length && <div className="td-empty-content">
                                                <div className="table-no-content"></div>
                                                <div className="td-add-content">
                                                    <img src={addIcon} alt="plus add icon" />
                                                </div>
                                            </div>}
                                            {action && action.action === 'members' && action.taskId === task.id &&
                                                <div className="task-action-contain"
                                                    style={{
                                                        position: 'fixed',
                                                        top: `${action.position.top}px`,
                                                        left: `${action.position.left}px`,
                                                    }}
                                                >
                                                    <TaskAction
                                                        action="members"
                                                        getMemberById={getMemberById}
                                                        {...taskActionProps}
                                                        onSetAction={onSetAction}
                                                    />
                                                </div>
                                            }
                                        </td>
                                        <td className="mid-width dates-td"
                                            onClick={(e) => onSetAction(e, 'dates', task.id, 563)}
                                        >
                                            {task.dueDate && (
                                                <>
                                                    <input
                                                        onClick={(ev) => ev.stopPropagation()}
                                                        className="checkbox-due-date"
                                                        type="checkbox"
                                                        onChange={(ev) => onChangeIsDone(ev, group, task)}
                                                        checked={task.isDone}
                                                    />
                                                    <div
                                                        title={taskStatus.title}
                                                        className="timer-container"
                                                        style={taskStatus.style}
                                                    >
                                                        <img
                                                            src={clockIcon}
                                                            alt="clock icon"
                                                            style={{ filter: taskStatus.iconFilter }}
                                                        />
                                                        <span
                                                            style={{ color: taskStatus.textColor }}
                                                        >
                                                            {getFormattedShortTime(task.dueDate)}
                                                        </span>
                                                    </div>
                                                    <img className="arrow-down-icon-dates" src={arrowDownIcon} alt="" />
                                                </>
                                            )}
                                            {!task.dueDate && <div className="td-empty-content">
                                                <div className="table-no-content"></div>
                                                <div className="td-add-content">
                                                    <img src={addIcon} alt="plus add icon" />
                                                </div>
                                            </div>}
                                            {action && action.action === 'dates' && action.taskId === task.id &&
                                                <div className="task-action-contain"
                                                    style={{
                                                        position: 'fixed',
                                                        top: `${action.position.top}px`,
                                                        left: `${action.position.left}px`,
                                                    }}
                                                >
                                                    <TaskAction
                                                        action="dates"
                                                        {...taskActionProps}
                                                        onSetAction={onSetAction}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        })}
                        <tr className="table-footer-last-element">
                            <td className="table-footer-last-element" colSpan="6"></td>
                        </tr>
                        <tr className="table-footer">
                            <td className="table-footer" colSpan="6"></td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className="add-btn"
                    onClick={() => setIsAdding({ state: !isAdding.state, type: null })}
                >
                    <img className="btn-icon" src={addIcon} alt="add plus icon" />
                    <span className="btn-text">
                        Add
                    </span>
                </button>
                {isAdding.state && !isAdding.type &&
                    <article className="add-list-or-card">
                        <div
                            className="btn-add-option"
                            onClick={() => setIsAdding({ state: true, type: 'card' })}>
                            Card
                        </div>
                        <div
                            className="btn-add-option"
                            onClick={() => setIsAdding({ state: true, type: 'list' })}>
                            List
                        </div>
                    </article>
                }
                {isAdding.state && isAdding.type &&
                    <article className="table-add-container" onClick={(e) => e.stopPropagation()}>
                        <header className="add-header">
                            <h1 className="header-title">{isAdding.type === 'list' ? 'Add List' : 'Add Card'}</h1>
                            <div className="btn-close-container"
                                onClick={() => setIsAdding({ state: false, type: null })}
                            >
                                <img className="btn-close" src={closeIcon}></img>
                            </div>
                        </header>
                        {isAdding.type === 'list' ?
                            <article className="add-list-body">
                                <h4>Name</h4>
                                <input
                                    onChange={e => setNewListTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter list name..."
                                    className="add-list-input" />
                                <h4>Position</h4>
                                <div className="custom-select" ref={dropdownRef}>
                                    <div className="select-header" onClick={toggleDropdown}>
                                        <span className="selected-option">{selectedOption}</span>
                                        <svg className='arrow' width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                            <path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    {isOpen && (
                                        <ul className="options">
                                            {options.length === 0 ? (
                                                <li
                                                    key="1"
                                                    className={selectedOption === "1" ? 'selected' : ''}
                                                    onClick={() => handleOptionClick("1")}>
                                                    1
                                                </li>
                                            ) : (
                                                options.map(option => (
                                                    <li
                                                        key={option}
                                                        className={option === selectedOption ? 'selected' : ''}
                                                        onClick={() => handleOptionClick(option)}>
                                                        {option}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    )}
                                </div>
                                <button
                                    disabled={!newListTitle}
                                    className="btn-add-list"
                                    onClick={onAddList}
                                >Add List</button>
                            </article>
                            :
                            <article className="add-card-body">
                                <h4>Title</h4>
                                <input
                                    onChange={e => setNewCardTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter a title for this card"
                                    className="add-card-input" />
                                <h4>List</h4>
                                <div className="custom-select" ref={dropdownRef}>
                                    <div className="select-header" onClick={toggleDropdown}>
                                        <span className="selected-option">{selectedCardOption.title}</span>
                                        <svg className='arrow' width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                            <path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    {isOpen && (
                                        <ul className="options">
                                            {cardOptions.map(option => (
                                                <li
                                                    key={option.id}
                                                    className={option.id === selectedCardOption.id ? 'selected' : ''}
                                                    onClick={() => handleCardOptionClick(option)}>
                                                    {option.title}
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    )}
                                </div>
                                <button
                                    disabled={!newCardTitle}
                                    className="btn-add-list"
                                    onClick={onAddCard}
                                >Add Card</button>
                            </article>
                        }
                    </article>
                }
            </section>
        </section>

    )
}