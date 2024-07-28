import { TaskAction } from '../cmps/TaskAction'

import { useState, useEffect, useRef } from "react"
import { updateBoard } from '../store/actions/board.actions'
import { updateTask } from '../store/actions/task.actions'

import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'
import coverWhiteIcon from '../assets/imgs/TaskDetails-icons/cover-white.svg'
import cardIcon from '../assets/imgs/TaskDetails-icons/card.svg'
import coverIcon from '../assets/imgs/TaskDetails-icons/cover.svg'
import datesIcon from '../assets/imgs/TaskDetails-icons/dates.svg'
import trashIcon from '../assets/imgs/TaskDetails-icons/trash.svg'
import { updateGroup } from '../store/actions/group.actions'

export function QuickEditTask({ task, onClose, taskPosition, group, board, user, handleTaskClick, onSetCover, onRemoveCover }) {

  const [taskTitleInputValue, setTaskTitleInputValue] = useState(task?.title || '')
  const [action, setAction] = useState(null)
  const [labelToEdit, setLabelToEdit] = useState(null)
 

  function onSetAction(ev, act) {
    ev.stopPropagation()
    setAction(action === act ? null : act)
  }

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

  function getMemberById(id) {
    return board.members.find(member => member._id === id)
  }

   // Remove task

   async function onRemoveTask() {
    const newTasks = group.tasks.filter(t => t.id !== task.id)
    const newGroup = { ...group, tasks: newTasks }
    const activityTitle = `removed task (id: ${task.id})`
    await updateGroup(newGroup.id, newGroup, board, activityTitle,user)
    
}



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
          height: '73px',
        }}
      >
        <textarea defaultValue={task.title}
          onClick={(e) => e.stopPropagation()}
          value={taskTitleInputValue}
          onChange={(ev) => setTaskTitleInputValue(ev.target.value)}
          onKeyPress={handleTitleKeyPress}
          autoFocus
        />
        {/* Task icones */}
        {task.labelsIds && task.labelsIds.length > 0 && (
          <div className="labels-container">
            {task.labelsIds.map(labelId => {
              const label = board.labels.find(l => l.id === labelId)
              return (
                <div
                  key={label.id}
                  className="label-item"
                  style={{ backgroundColor: label.color }}
                  title={label.title}
                ></div>
              )
            })}
          </div>
        )}

        {task.membersIds && task.membersIds.length > 0 && (
          <div className="members-container">
            <div className="members-img-container">
              {task.membersIds.map(id => {
                const member = getMemberById(id)
                return <img key={member._id} className="task-member-thumbnail" src={member.imgUrl} title={member.fullname} alt={member.fullname} />
              })}
            </div>
          </div>
        )}
        {/* save btn needs replace */}
        <span className="save-btn" onClick={() => {
          onClose
          handleTitleUpdate()

        }} >save</span>

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
            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'dates')}>
              <img className="dates-icon icon" src={datesIcon} alt="dates icon" />
              <span className="action-title">Dates</span>
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
         
            <div className="task-action-container">
              <button type='button' className="action" name="cover" onClick={(ev) => onSetAction(ev, 'cover')}>
                <img className="cover-icon icon" src={coverIcon} alt="cover icon" />
                <span className="action-title">Cover</span>
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
         
          <button className="action remove-task" onClick={onRemoveTask}>
            <img className="icon" src={trashIcon} alt="trash icon" />
            <span className="action-title">Delete card</span>
          </button>

        </div>
      </div>
    </div>
  )
}