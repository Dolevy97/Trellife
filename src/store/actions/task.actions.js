import { loadBoard, updateBoard } from "./board.actions"

// export async function updateTask(taskToEdit, groupId, group, board) {
export async function updateTask(taskToEdit, group, board) {

    let tasks = group.tasks
    tasks = tasks.map(task => {
        if (task.id !== taskToEdit.id) return task
        return taskToEdit
    })

    let groups = board.groups
    groups = groups.map(g => {
        if (g.id !== group.id) return g
        return { ...g, tasks }
    })

    const boardToSave = { ...board, groups }

    try {
        await updateBoard(boardToSave)
        const newBoard = await loadBoard(boardToSave._id)
        console.log('Task updated')
        return newBoard
    } catch (er) {
        console.log('err: ' + er)
    }
}


export async function addTask(newTaskTitle, group, board) {
    try {
        const newTask = boardService.getEmptyTask()
        newTask.title = newTaskTitle.trim()

        const updatedGroup = {
            ...group,
            tasks: [...group.tasks, newTask]
        }

        const updatedBoard = {
            ...board,
            groups: board.groups.map(g => g.id === group.id ? updatedGroup : g)
        }

        await updateBoard(updatedBoard)
        const newBoard = await loadBoard(updatedBoard._id)

        return newBoard
    } catch (error) {
        console.error('Failed to add task:', error)
    }
}
