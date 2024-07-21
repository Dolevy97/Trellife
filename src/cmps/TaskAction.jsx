import { useEffect, useState } from "react"
import { updateTask } from "../store/actions/task.actions"


export function TaskAction({ action, board, task, getMemberById, group }) {

    const [currBoard,setCurrBoard] = useState(board)

    function getBoardMembers() {
        const boardMembers = board.members.filter(member => !task.membersIds.includes(member._id))

        return boardMembers
    }

    function getTaskMembers() {
        return task.membersIds.map(getMemberById)
    }

    async function onAddMember(id) {
        task.membersIds.push(id)
        const newBoard = await updateTask(task, group.id, group, board)
         setCurrBoard({ ...newBoard });  
        console.log('Added member')
    }
    
    async function onRemoveMember(id) {
        task = { ...task, membersIds: task.membersIds.filter(mId => mId !== id) };
        const newBoard = await updateTask(task, group.id, group, board);
        // DOESN'T RERENDER
        setCurrBoard({ ...newBoard });
        console.log('Removed member');
    }

    console.log('Render')

    return (
        <section className="task-action">
            <header className="action-header">
                Members
            </header>
            <input className="text" placeholder="Search members" />
            <div className="card-members">
                <span className="title">Card members</span>
                {getTaskMembers().map(member => {
                    return (
                        <div key={member._id} className="member" onClick={() => onRemoveMember(member._id)}>
                            <img className="member-thumbnail" src={member.imgUrl} title={member.fullname} />
                            <span className="name">{member.fullname}</span>
                        </div>
                    )
                })}
                {/* <button className="delete"><img className="close-icon icon" src="../../../src/assets/imgs/Icones/close.svg" /></button> */}
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
        </section>
    )
}