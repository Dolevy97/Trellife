import { loadBoard, updateBoard } from "./board.actions"

export async function upadteTask(taskToEdit, groupId, group, board) {

    let tasks = group.tasks
    tasks = tasks.map(task => {
        if (task.id !== taskToEdit.id) return task
        return taskToEdit
    })

    let groups = board.groups
    groups = groups.map(group => {
        if (group.id !== groupId) return group
        return { ...group, tasks }
    })

    const boardToSave = { ...board, groups }

    try {
        await updateBoard(boardToSave)
        await loadBoard(boardToSave._id)
        console.log('Task updated')
    } catch (er) {
        console.log('err: ' + er)
    }
}