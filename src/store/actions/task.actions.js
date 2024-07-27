import { boardService } from "../../services/board"
import { getRandomMember } from "../../services/board/board-demo-data.service"
import { makeId } from "../../services/util.service"
import { UPDATE_BOARD, UPDATE_BOARD_FAILED } from "../reducers/board.reducer"
import { store } from "../store"
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
            byMember: user,
            // FOR LOCAL:
            // byMember: getRandomMember(),
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

// // Optimistic test

// export async function updateTask(task, group, board, activityTitle = '', user) {
//     let tasks = group.tasks.map(t => t.id === task.id ? task : t)
//     let groups = board.groups.map(g => g.id === group.id ? { ...g, tasks } : g)
//     let activities = [...board.activities]

//     if (activityTitle) {
//         const activity = {
//             id: 'a' + makeId(),
//             title: activityTitle,
//             byMember: user,
//             group: { ...group },
//             task: { ...task },
//             createdAt: Date.now()
//         }
//         activities.push(activity)
//     }

//     const updatedBoard = { ...board, groups, activities }

//     store.dispatch({ type: UPDATE_BOARD, board: updatedBoard })

//     try {
//         await updateBoard(updatedBoard)

//         const latestBoard = await loadBoard(updatedBoard._id)

//         store.dispatch({ type: UPDATE_BOARD, board: latestBoard })

//         // console.log('Task updated successfully')
//         return latestBoard
//     } catch (error) {
//         console.error('Error updating task:', error)

//         store.dispatch({ type: UPDATE_BOARD_FAILED, originalBoard: board })

//         throw error
//     }
// }


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
