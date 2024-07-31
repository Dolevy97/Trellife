
import attachmentIcon from '../assets/imgs/TaskDetails-icons/attachment.svg'
import descriptionIcon from '../assets/imgs/Icons/description.svg'
import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import commentIcon from '../assets/imgs/Icons/comment.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'
import coverWhiteIcon from '../assets/imgs/TaskDetails-icons/cover-white.svg'
import cardIcon from '../assets/imgs/TaskDetails-icons/card.svg'
import coverIcon from '../assets/imgs/TaskDetails-icons/cover.svg'
import datesIcon from '../assets/imgs/TaskDetails-icons/dates.svg'
import trashIcon from '../assets/imgs/TaskDetails-icons/trash.svg'
import { updateGroup } from '../store/actions/group.actions'
import { getFormattedShortTime, isLightColor } from '../services/util.service'
import autosize from 'autosize'

import { TaskAction } from '../cmps/TaskAction'
import { useState, useEffect, useRef } from "react"
import { updateTask } from '../store/actions/task.actions'

export function QuickEditTask({ task, onClose, taskPosition, group, board, user, handleTaskClick, toggleLabelExpansion, areLabelsExpanded }) {

  const [taskTitleInputValue, setTaskTitleInputValue] = useState(task?.title || '')
  const [action, setAction] = useState(null)
  const [labelToEdit, setLabelToEdit] = useState(null)
  const [coverStyle, setCoverStyle] = useState(task.style || {})
  const textareaRef = useRef(null)


  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current)
    }

    return () => {
      if (textareaRef.current) {
        autosize.destroy(textareaRef.current)
      }
    }
  }, [taskTitleInputValue])

  /* Set Action */
  function onSetAction(ev, act) {
    ev.stopPropagation()
    setAction(action === act ? null : act)
  }

  /* Title change */
  function handleTitleKeyPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      handleTitleUpdate()
    }
  }

  async function handleTitleUpdate() {
    let titleToSet = taskTitleInputValue.trim()
    if (titleToSet === '' || titleToSet === task.title) {
      setTaskTitleInputValue(task.title)
      return
    }

    const updatedTask = { ...task, title: titleToSet }
    try {
      await updateTask(updatedTask, group, board, `Changed task title to "${titleToSet}"`, user)
    } catch (error) {
      console.error('Failed to update task title:', error)
      setTaskTitleInputValue(task.title)
    }
  }

  /* Comment */
  function getComments(taskId) {
    let comments = board.activities.filter(activity => {

      return activity.title === 'add comment' && activity.task.id === taskId
    })
    if (!comments) return []
    comments = comments.sort((a, b) => b.createdAt - a.createdAt)
    return comments
  }

  /* Members */
  function getMemberById(id) {
    return board.members.find(member => member._id === id)
  }

  // Remove task
  async function onRemoveTask() {
    const newTasks = group.tasks.filter(t => t.id !== task.id)
    const newGroup = { ...group, tasks: newTasks }
    const activityTitle = `removed task ${task.id}`
    await updateGroup(newGroup.id, newGroup, board, activityTitle, user)

  }

  /*Cover */
  async function onSetCover(attachment) {
    const updatedTask = { ...task, style: { ...task.style, backgroundImage: `url(${attachment.url})`, backgroundColor: attachment.backgroundColor } }
    const activityTitle = `set ${attachment.title} as a cover for card ${updatedTask.id}`
    await updateTask(updatedTask, group, board, activityTitle, user)
  }

  async function onRemoveCover() {
    const updatedTask = { ...task, style: null }
    await updateTask(updatedTask, group, board, "Removed cover from task", user)
  }

  /* Duedate */
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
        iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
      }
    }

    return {
      title: 'This card is due later.',
      style: {},
      textColor: '',
      iconFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
    }
  }
  /*Checklist*/
  function getDoneInChecklist(taskId, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task.checklists.reduce((total, checklist) => {
      return total + (Array.isArray(checklist.todos) ? checklist.todos.filter(todo => todo.isDone).length : 0)
    }, 0)
  }

  function getAllTodosInChecklist(taskId, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    if (!group) {
      // console.error(`Group with id ${groupId} not found`)
      return 0
    }

    const task = group.tasks.find(task => task.id === taskId)
    if (!task) {
      return 0
    }

    if (!task.checklists) {
      console.warn(`Task ${taskId} has no checklists`)
      return 0
    }

    return task.checklists.reduce((total, checklist) => {
      return total + (Array.isArray(checklist.todos) ? checklist.todos.length : 0)
    }, 0)
  }

  const taskStatus = getTaskStatus(task)

  const taskActionProps = { task, group, board, user, onClose: () => setAction(null) }

  return (
    <div className="quick-edit-overlay" onClick={onClose}>
      <div
        className="quick-edit-container"
        style={{
          position: 'absolute',
          left: `${taskPosition.left - 2}px`,  // 2px wider on the left
          top: `${taskPosition.top - 2}px`,    // 3px higher
          width: `${taskPosition.width + 4}px`, // 2px wider on each side
        }}
      >

        {/* On the task */}
        <div className={`quick-edit-main ${task.style?.backgroundImage ? 'task-inner-container-img' : ''} ${task.style ? '' : 'regular-task'}`}
          style={task.style && task.style ? { ...task.style, borderRadius: '8px' } : {}}>

          {task.style && !task.style && (
            <section
              className={`cover-container ${task.style?.backgroundImage ? 'cover-container-img' : ''}`}
              style={{ ...task.style }}>
            </section>
          )}

          <div className='under-the-cover-info'>

            {task.labelsIds && task.labelsIds.length > 0 && (
              <div className="labels-container">
                {task.labelsIds.map(labelId => {
                  const label = board.labels.find(l => l.id === labelId)
                  return (
                    <div
                      key={label.id}
                      className={`label-item ${areLabelsExpanded ? 'expanded' : ''}`}
                      onClick={toggleLabelExpansion}
                      style={{ backgroundColor: label.color }}
                      title={label.title}
                    >
                      <div
                        className="label-color"
                        style={{ backgroundColor: label.color }}
                      >
                        {areLabelsExpanded && <span className="label-title" style={{ color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}>{label.title}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <textarea

              // defaultValue={task.title}
              onClick={(e) => e.stopPropagation()}
              value={taskTitleInputValue}
              onChange={(ev) => setTaskTitleInputValue(ev.target.value)}
              onKeyPress={handleTitleKeyPress}
              autoFocus
              ref={textareaRef}
            />
            <div className='task-bottom-container'>

              <div className='bottom-leftside'>

                {task.dueDate && (
                  <div
                    title={taskStatus.title}
                    className="timer-container"
                    style={taskStatus.style}
                  >
                    <img
                      style={{ filter: taskStatus.iconFilter }}
                      src={clockIcon}
                      alt="clock icon" />
                    <span
                      style={{ color: taskStatus.textColor }}
                    >
                      {getFormattedShortTime(task.dueDate)}
                    </span>
                  </div>
                )}

                {task.description && task.description.trim() !== '' && (
                  <img className='description' title='This card has a description.' src={descriptionIcon} alt="description" />
                )}

                {getComments(task.id).length ?
                  <div title='Comments' className='comment-container'>
                    <img src={commentIcon} />
                    <span className='task-comment'>{getComments(task.id).length} </span>
                  </div> : ''
                }

                {task.attachments.length ?
                  <div title='Attachments' className='attachment-container'>
                    <img src={attachmentIcon} />
                    <span className='task-comment'>{task.attachments.length}</span>
                  </div> : ''
                }

                {task.checklists.length && getAllTodosInChecklist(task.id, group.id) !== 0 ? (
                  <div
                    title='Checklist items'
                    className='task-checklist-container'
                    style={{
                      backgroundColor: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? '#4BCE97' : '',
                      color: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? '#1d2125' : '',
                      padding: '2px 4px',
                      borderRadius: '3px'
                    }}
                  >
                    <img
                      src={checklistIcon}
                      style={{
                        filter: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id)
                          ? 'brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(697%) hue-rotate(169deg) brightness(97%) contrast(91%)'
                          : ''
                      }}
                    />
                    <span
                      className='task-checklist'
                      style={{
                        backgroundColor: getDoneInChecklist(task.id, group.id) === getAllTodosInChecklist(task.id, group.id) ? 'var(--bgclr1)' : ''
                      }}
                    >
                      {getDoneInChecklist(task.id, group.id)}/{getAllTodosInChecklist(task.id, group.id)}
                    </span>
                  </div>
                ) : ''}

              </div>

              {task.membersIds && task.membersIds.length > 0 && (
                <div className="members-container">
                  {task.membersIds.map(id => {
                    const member = getMemberById(id)
                    return <img key={member._id} className="task-member-thumbnail" src={member.imgUrl} title={member.fullname} alt={member.fullname} />
                  })}
                </div>
              )}


            </div>
          </div>
        </div>
        {/* On the task end */}

        <div className="quick-card-editor-buttons">

          <div className="task-action-container">
            <button type='button' className="action" onClick={() => handleTaskClick(task.id)} >
              <img className="labels-icon icon" src={cardIcon} alt="labels icon" />
              <span className="action-title">Open card</span>
            </button>
          </div>

          <div className="task-action-container">
            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'labels')}>
              <img className="labels-icon icon" src={labelIcon} alt="labels icon" />
              <span className="action-title">Edit labels</span>
            </button>
            {action === 'labels' &&
              <TaskAction
                action="labels"
                {...taskActionProps}
                setLabelToEdit={setLabelToEdit}
                onSetAction={onSetAction}
              />
            }
            {action === 'edit label' &&
              <TaskAction
                action="edit label"
                labelToEdit={labelToEdit}
                setLabelToEdit={setLabelToEdit}
                {...taskActionProps}
                onSetAction={onSetAction}
              />
            }
          </div>

          <div className="task-action-container">
            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'members')}>
              <img className="members-icon icon" src={membersIcon} alt="members icon" />
              <span className="action-title">Change members</span>
            </button>
            {action === 'members' &&
              <TaskAction
                action="members"
                getMemberById={getMemberById}
                {...taskActionProps}
                onSetAction={onSetAction}
              />
            }
          </div>

          <div className="task-action-container">
            <button type='button' className="action" name="cover" onClick={(ev) => onSetAction(ev, 'cover')}>
              <img className="cover-icon icon" src={coverIcon} alt="cover icon" />
              <span className="action-title">Change cover</span>
            </button>
            {action === 'cover' &&
              <TaskAction
                action="cover"
                onSetCover={onSetCover}
                onRemoveCover={onRemoveCover}
                {...taskActionProps}
                onSetAction={onSetAction}
              />
            }
          </div>

          <div className="task-action-container">
            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'dates')}>
              <img className="dates-icon icon" src={datesIcon} alt="dates icon" />
              <span className="action-title">Edit dates</span>
            </button>
            {action === 'dates' &&
              <TaskAction
                action="dates"
                {...taskActionProps}
                dueDate={task.dueDate}
                onSetAction={onSetAction}
              />
            }
          </div>


          <button className="action remove-task" onClick={onRemoveTask}>
            <img className="icon" src={trashIcon} alt="trash icon" />
            <span className="action-title">Delete card</span>
          </button>

        </div>
        <span className="save-btn" onClick={() => {
          onClose
          handleTitleUpdate()

        }} >Save</span>

      </div>


    </div>

  )
}