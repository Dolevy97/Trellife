
import membersIcon from '../assets/imgs/TaskDetails-icons/members.svg'
import labelIcon from '../assets/imgs/TaskDetails-icons/labels.svg'
import checklistIcon from '../assets/imgs/Icons/checklist.svg'
import clockIcon from '../assets/imgs/Icons/clock.svg'


export function QuickEditTask({ task, onClose }) {
    return (
      <div className="quick-edit-overlay" onClick={onClose}>
        <div className="quick-edit-container" onClick={(e) => e.stopPropagation()}>
          <textarea defaultValue={task.title} />
          <div className="quick-edit-icons">
            {/* <img src={membersIcon} alt="Members" />
            <img src={labelIcon} alt="Labels" />
            <img src={checklistIcon} alt="Checklist" />
            <img src={clockIcon} alt="Due date" /> */}
            <span onClick={onClose} >close</span>
          </div>
        </div>
      </div>
    )
  }