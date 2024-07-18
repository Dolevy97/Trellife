import { updateBoard } from "./board.actions"

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
        console.log('Task updated')
    } catch (er) {
        console.log('err: ' + er)
    }
}