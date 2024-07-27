import { TaskAction } from '../cmps/TaskAction'

import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'


export function QuickEditTask({ task, onClose, taskPosition }) {

  // console.log(task)
  return (
    <div className="quick-edit-overlay" onClick={onClose}>
      <div
        className="quick-edit-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: `${taskPosition.left - 2}px`,  // 2px wider on the left
          top: `${taskPosition.top - 3}px`,    // 3px higher
          width: `${taskPosition.width + 4}px`, // 2px wider on each side
          height: '72px',
        }}
      >
        <textarea defaultValue={task.title} />
        <span className="save-btn">save</span>
        <div className="quick-edit-icons">
          {/* <TaskAction /> */}
        </div>
      </div>
    </div>
  )
}