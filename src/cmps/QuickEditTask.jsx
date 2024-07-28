import { TaskAction } from '../cmps/TaskAction'

import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'
import { useState, useEffect, useRef } from "react"
import { updateBoard } from '../store/actions/board.actions'
import { updateTask } from '../store/actions/task.actions'

export function QuickEditTask({ task, onClose, taskPosition, group, board, user }) {

  const [taskTitleInputValue, setTaskTitleInputValue] = useState(task?.title || '')
  const [action, setAction] = useState(null)

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
        <span className="save-btn" onClick={() => {
          onClose
          handleTitleUpdate()

        }} >save</span>

        <div className="quick-card-editor-buttons">

          <div className="task-action-container">
            <button type='button' className="action" onClick={(ev) => onSetAction(ev, 'members')}>
              <img className="members-icon icon" src={membersIcon} alt="members icon" />
              <span className="action-title">Members</span>
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

        </div>
      </div>
    </div>
  )
}