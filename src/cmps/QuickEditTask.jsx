


export function QuickEditTask({ task, onClose }) {
    return (
      <div className="quick-edit-overlay" onClick={onClose}>
        <div className="quick-edit-container" onClick={(e) => e.stopPropagation()}>
          <textarea defaultValue={task.title} />
          <div className="quick-edit-icons">
            {/* <img src="../../../src/assets/imgs/Icons/members.svg" alt="Members" />
            <img src="../../../src/assets/imgs/Icons/label.svg" alt="Labels" />
            <img src="../../../src/assets/imgs/Icons/checklist.svg" alt="Checklist" />
            <img src="../../../src/assets/imgs/Icons/clock.svg" alt="Due date" /> */}
            <span onClick={onClose} >close</span>
          </div>
        </div>
      </div>
    )
  }