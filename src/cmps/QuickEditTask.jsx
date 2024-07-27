// import { TaskAction } from '../cmps/TaskAction'

import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'
import { useState, useEffect, useRef } from "react"
import { updateBoard } from '../store/actions/board.actions'
import { updateTask } from '../store/actions/task.actions'

export function QuickEditTask({ task, onClose, taskPosition, group, board, user }) {

  const [taskTitleInputValue, setTaskTitleInputValue] = useState(task?.title || '')

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

  return (
    <div className="quick-edit-overlay" onClick={onClose}>
      <div
        className="quick-edit-container"
        style={{
          position: 'absolute',
          left: `${taskPosition.left - 2}px`,  // 2px wider on the left
          top: `${taskPosition.top - 3}px`,    // 3px higher
          width: `${taskPosition.width + 4}px`, // 2px wider on each side
          height: '72px',
        }}
      >
        <textarea defaultValue={task.title}
          onClick={(e) => e.stopPropagation()}
          value={taskTitleInputValue}
          onChange={(ev) => setTaskTitleInputValue(ev.target.value)}
          onKeyPress={handleTitleKeyPress}
          autoFocus
        />
        <span className="save-btn" onClick={() => {
         onClose
          handleTitleUpdate()

        }} >save</span>
        <div className="quick-edit-icons">
          {/* <TaskAction /> */}
        </div>
      </div>
    </div>
  )
}