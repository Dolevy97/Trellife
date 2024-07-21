import { useEffect, useState } from "react"
import { updateTask } from "../store/actions/task.actions"


export function TaskAction({ action, board, group, task, getMemberById, getLabelById }) {

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

    async function onToggleLabel(ev,id) {
        const {checked} = ev.target
        if (checked) {
            task.labelsIds.push(id)
        } else{
            task = {...task,labelsIds:task.labelsIds.filter(labelId => labelId !== id)}
        }
        await updateTask(task, group.id, group, board);
    }

    return (
        <section className="task-action" onClick={(ev)=>ev.stopPropagation()}>
            <header className="action-header">
                {action.charAt(0).toUpperCase() + action.substring(1, action.length)}
            </header>
            <input className="text" placeholder={`Search ${action}`} />
            {action === 'members' &&
                <>
                    <div className="card-members">
                        <span className="title">Card members</span>
                        {getTaskMembers().map(member => {
                            return (
                                <div key={member._id} className="member card-member" onClick={() => onRemoveMember(member._id)}>
                                    <img className="member-thumbnail" src='../../../src/assets/imgs/user-imgs/user-img1.jpg' title={member.fullname} />
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
                                    <img className="member-thumbnail" src='../../../src/assets/imgs/user-imgs/user-img1.jpg' title={member.fullname} />
                                    <span className="name">{member.fullname}</span>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {action === 'labels' &&
                <>
                    <div className="card-labels">
                        <span className="title">Labels</span>
                        {board.labels.map(label => {
                            return (
                                <div key={label.id} className="label-container">
                                    <input type="checkbox" checked={task.labelsIds.includes(label.id)} onChange={()=>onToggleLabel(event,label.id)}/>
                                    <div className="label" style={{ backgroundColor: label.color }}>{label.title}</div>
                                    <img src="../../../src/assets/imgs/TaskDetails-icons/pen.svg"></img>
                                </div>
                            )
                        })

                        }
                        {/* {getTaskLabels().map(labels => {
                            return (
                                <div key={labels._id} className="labels card-labels" onClick={() => onRemoveLabels(labels._id)}>
                                    <img className="labels-thumbnail" src='../../../src/assets/imgs/user-imgs/user-img1.jpg' title={labels.fullname} />
                                    <span className="name">{labels.fullname}</span>
                                    <img className="close-icon icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="board-labelss">
                        <span className="title">Board labelss</span>
                        {getBoardLabels().map(labels => {
                            return (
                                <div key={labels._id} className="labels" onClick={() => onAddlabels(labels._id)}>
                                    <img className="labels-thumbnail" src='../../../src/assets/imgs/user-imgs/user-img1.jpg' title={labels.fullname} />
                                    <span className="name">{labels.fullname}</span>
                                </div>
                            )
                        })} */}
                    </div>
                </>
            }
        </section>
    )
}