import { useEffect, useState } from "react"
import { updateTask } from "../store/actions/task.actions"
import { getAverageColorFromAttachment, makeId } from "../services/util.service"
import { cloudinaryService } from "../services/cloudinary.service"


export function TaskAction({ action, board, group, task, getMemberById, getLabelById, onSetAction, onRemoveCover, onSetCover }) {
    const [checklistInputValue, setChecklistInputValue] = useState('Checklist')

    function getBoardMembers() {
        const boardMembers = board.members.filter(member => !task.membersIds.includes(member._id))
        return boardMembers
    }

    function getTaskMembers() {
        return task.membersIds.map(getMemberById)
    }

    async function onAddMember(id) {
        const updatedTask = { ...task }
        updatedTask.membersIds.push(id)
        const activityTitle = `added member (id: ${id}) to task (id: ${task.id})`
        await updateTask(updatedTask, group, board, activityTitle)
    }

    async function onRemoveMember(id) {
        task = { ...task, membersIds: task.membersIds.filter(mId => mId !== id) }
        await updateTask(task, group, board)
    }

    async function onToggleLabel(ev, id) {
        const { checked } = ev.target
        let updatedTask = { ...task }
        if (checked) {
            updatedTask.labelsIds.push(id)
        } else {
            updatedTask = { ...updatedTask, labelsIds: updatedTask.labelsIds.filter(labelId => labelId !== id) }
        }
        await updateTask(updatedTask, group, board)
    }

    async function onUpdateCoverColor({ target }) {
        const backgroundColor = target.style.backgroundColor
        const backgroundImage = ''
        const background = { backgroundColor, backgroundImage }
        if (!task.style) {
            task = { ...task, style: { isFull: false, ...background } }
        } else {
            task = { ...task, style: { ...task.style, ...background } }
        }
        await updateTask(task, group, board)
    }

    async function onUpdateCoverIsFull({ target }) {
        if (!task.style) return
        const isFull = JSON.parse(target.name)
        task = { ...task, style: { ...task.style, isFull } }
        await updateTask(task, group, board)
    }

    async function onSetAttachmentAsCover(ev, a) {
        onSetCover(a)
        onSetAction(ev, true)
    }

    async function onAddChecklist(ev) {
        const updatedTask = { ...task }
        updatedTask.checklists.push({ id: 'cl' + makeId(), title: checklistInputValue, todos: [] })
        const activityTitle = `added ${checklistInputValue} to this card`
        await updateTask(updatedTask, group, board, activityTitle)
        onSetAction(ev, true)
    }

    async function onAddAttachment(ev) {
        const files = ev.target.files

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const url = await cloudinaryService.uploadImg(file)
            const attachment = {
                title: file.name,
                url,
                createdAt: Date.now(),
                type: file.type
            }
            attachment.backgroundColor = await getAverageColorFromAttachment(attachment)

            let updatedTask = { ...task }

            updatedTask.attachments.push(attachment)
            const activityTitle = `attached ${file.name} to this card`

            if (!updatedTask.style) {
                updatedTask = { ...updatedTask, style: { isFull: true, backgroundImage: `url(${attachment.url}`, backgroundColor: attachment.backgroundColor } }
            }

            await updateTask(updatedTask, group, board, activityTitle)
        }

        onSetAction(ev, true)
    }

    function onUpload() {
        document.querySelector('.input-file-upload').click()
    }

    return (
        <section className="task-action" onClick={(ev) => ev.stopPropagation()}>
            <header className="action-header">
                {action.charAt(0).toUpperCase() + action.substring(1, action.length)}
                <div onClick={(ev) => onSetAction(ev, true)} className="close-action-container"> <img className="close-action icon" src="../../../src/assets/imgs/TaskDetails-icons/close.svg" /> </div>
            </header>
            {(action === 'members' || action === 'labels') && <input className="text" placeholder={`Search ${action}`} />}
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
                                    <div className="label" style={{ backgroundColor: label.color }} >{label.title}</div>
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
                        <div className="size-container">
                            <span className="title">Size</span>
                            <div className="size-btns">
                                <button className="head btn-size" name="false" onClick={onUpdateCoverIsFull}>Head</button>
                                <button className="full btn-size" name="true" onClick={onUpdateCoverIsFull}>Full</button>
                            </div>
                            {task.style && <button className="remove-cover" onClick={onRemoveCover}>Remove cover</button>}
                        </div>
                        <div className="colors-container">
                            <span className="title">Colors</span>
                            <div className="colors">
                                <div className="color" style={{ backgroundColor: '#206e4e' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#7f5f02' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#a64700' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#ae2e24' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#5e4db2' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#0055cc' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#1f6a83' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#4d6b1f' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#943d73' }} onClick={onUpdateCoverColor}></div>
                                <div className="color" style={{ backgroundColor: '#596773' }} onClick={onUpdateCoverColor}></div>
                            </div>
                        </div>
                        {task.attachments && task.attachments.length &&
                            <div className="cover-attachments-container">
                                <span className="title">Attachments</span>
                                <div className="cover-attachments">
                                    {task.attachments.map(a =>
                                        <div
                                            key={a.url}
                                            className="cover-attachment"
                                            style={{ backgroundImage: `url(${a.url})`, backgroundColor: a.backgroundColor }}
                                            onClick={(ev) => onSetAttachmentAsCover(ev, a)}
                                        />)}
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
            {action === 'add checklist' &&
                <>
                    <div className="checklist">
                        <span className="title">Title</span>
                        <input className="text" value={checklistInputValue} onChange={(ev) => setChecklistInputValue(ev.target.value)} />
                    </div>
                    <button className="add-checklist" onClick={onAddChecklist}>Add</button>
                </>
            }
            {action === 'attach' &&
                <>
                    <div className="attachment">
                        <span className="sub-title">Attach a file from your computer</span>
                        <input
                            className="input-file-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={onAddAttachment}
                            multiple
                        />
                        <button className="btn-file-upload" onClick={onUpload}>Choose a file</button>
                    </div>
                </>
            }
        </section>
    )
}

