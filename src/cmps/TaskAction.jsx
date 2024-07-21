import { useEffect, useState } from "react"
import { updateTask } from "../store/actions/task.actions"
import { makeId } from "../services/util.service"


export function TaskAction({ action, board, group, task, getMemberById, getLabelById }) {

    const [checklistInputValue,setChecklistInputValue] = useState('Checklist')

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32 || event.key === ' ') {
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    function getBoardMembers() {
        const boardMembers = board.members.filter(member => !task.membersIds.includes(member._id))
        return boardMembers
    }

    function getTaskMembers() {
        return task.membersIds.map(getMemberById)
    }

    async function onAddMember(id) {
        task.membersIds.push(id)
        await updateTask(task, group.id, group, board)
    }

    async function onRemoveMember(id) {
        task = { ...task, membersIds: task.membersIds.filter(mId => mId !== id) };
        await updateTask(task, group.id, group, board);
    }

    async function onToggleLabel(ev, id) {
        const { checked } = ev.target
        if (checked) {
            task.labelsIds.push(id)
        } else {
            task = { ...task, labelsIds: task.labelsIds.filter(labelId => labelId !== id) }
        }
        await updateTask(task, group.id, group, board);
    }

    async function onUpdateCoverColor({target}){
        const color = target.style.backgroundColor
        task = { ...task, style: {backgroundColor: color} };
        await updateTask(task, group.id, group, board);
    }

    async function onAddChecklist(){
        task.checklists.push({id: 'cl' +makeId(), title:checklistInputValue, todos:[]})
        await updateTask(task, group.id, group, board);
    }


    return (
        <section className="task-action" onClick={(ev) => ev.stopPropagation()}>
            <header className="action-header">
                {action.charAt(0).toUpperCase() + action.substring(1, action.length)}
            </header>
          {(action==='members' || action==='labels') && <input className="text" placeholder={`Search ${action}`} />}  
            {action === 'members' &&
                <>
                    <div className="card-members">
                        <span className="title">Card members</span>
                        {getTaskMembers().map(member => {
                            return (
                                <div key={member._id} className="member card-member" onClick={() => onRemoveMember(member._id)}>
                                    <img className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                                    <span className="name">{member.fullname}</span>
                                    <img className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" />
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
                                    <input className="label-checkbox" type="checkbox" checked={task.labelsIds.includes(label.id)} onChange={() => onToggleLabel(event, label.id)} />
                                    <div className="label" style={{ backgroundColor: label.color }}>{label.title}</div>
                                    <div className="pen-icon-container"><img className="pen-icon" src="../../../src/assets/imgs/TaskDetails-icons/pen.svg"></img></div>
                                </div>
                            )
                        })

                        }
                    </div>
                </>
            }
            {action === 'cover' &&
                <>
                    <div className="cover">
                    <span className="title">Colors</span>
                        <div className="colors">
                            <div className="color" style={{backgroundColor: '#206e4e'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#7f5f02'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#a64700'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#ae2e24'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#5e4db2'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#0055cc'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#1f6a83'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#4d6b1f'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#943d73'}} onClick={onUpdateCoverColor}></div>
                            <div className="color" style={{backgroundColor: '#596773'}} onClick={onUpdateCoverColor}></div>
                        </div>
                    </div>
                </>
            }
            {action === 'add checklist' && 
            <>
                <div className="checklist"></div>
                <input className="text" value={checklistInputValue} onChange={(ev)=>setChecklistInputValue(ev.target.value)}/>
                <button className="add-checklist" onClick={onAddChecklist}>Add</button>
            </>
            }
        </section>
    )
}

