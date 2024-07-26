import { getRandomMember } from "../../services/board/board-demo-data.service"
import { getRandomIntInclusive, makeId } from "../../services/util.service"
import { loadBoard, updateBoard } from "./board.actions"

export async function updateTask(task, group, board, activityTitle = '', user) {

    let tasks = [...group.tasks]
    tasks = tasks.map(t => {
        if (t.id !== task.id) return t
        return task
    })

    let groups = [...board.groups]
    groups = groups.map(g => {
        if (g.id !== group.id) return g
        return { ...g, tasks }
    })

    let activities = [...board.activities]
    if (activityTitle) {
        const activity = {
            id: 'a' + makeId(),
            title: activityTitle,
            // byMember: user,
            // FOR LOCAL:
            byMember: getRandomMember(),
            group: { ...group },
            task: { ...task },
            createdAt: Date.now()
        }
        activities.push(activity)
    }
    const boardToSave = { ...board, groups, activities }

    try {
        await updateBoard(boardToSave)
        const newBoard = await loadBoard(boardToSave._id)
        console.log('Task updated')
        return newBoard
    } catch (er) {
        console.log('err: ' + er)
        throw er
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
