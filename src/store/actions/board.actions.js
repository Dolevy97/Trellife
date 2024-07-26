import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD } from '../reducers/board.reducer'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export function filterBoard(board, filterBy = {}) {
    if (!board || !board.groups) return board
    
    let filteredBoard = { ...board }


    filteredBoard.groups = board.groups.map(group => {
        const filteredTasks = group.tasks.filter(task => {
            const titleMatch = !filterBy.title || task.title.toLowerCase().includes(filterBy.title.toLowerCase())
            const memberMatch = !filterBy.memberIds || filterBy.memberIds.length === 0 || 
                (task.membersIds && task.membersIds.some(id => filterBy.memberIds.includes(id)))
            const labelMatch = !filterBy.labelIds || filterBy.labelIds.length === 0 || 
                (task.labelsIds && task.labelsIds.some(id => filterBy.labelIds.includes(id)))

            return titleMatch && memberMatch && labelMatch
        })

        return {
            ...group,
            tasks: filteredTasks
        }
    })

    // Remove empty groups
    if (filterBy.title) filteredBoard.groups = filteredBoard.groups.filter(group => group.tasks.length > 0)

    return filteredBoard
}


export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
        return board
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}


export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    store.dispatch(getCmdUpdateBoard(board));

    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard;
    } catch (err) {
        console.log('Cannot save board', err)
        store.dispatch({ type: 'UPDATE_BOARD_FAILED', originalBoard: board })
        throw err;
    }
}

export async function updateBoardBgc(board, bgc) {
    try {
        const updatedBoard = {
            ...board,
            style: {
                ...board.style,
                background: bgc
            }
        }
        await updateBoard(updatedBoard)
        return updatedBoard
    } catch (err) {
        console.log('Cannot update bgc board', err)
        throw err
    }
}

// Command Creators:
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'm1oC7',
        title: 'Board-Good',
    })
    await removeBoard('m1oC7')
    // TODO unit test addBoardMsg
}
