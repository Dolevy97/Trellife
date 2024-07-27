
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
import { boardDemoDataService } from './board-demo-data.service'

const STORAGE_KEY = 'board'

_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
}

window.cs = boardService


async function query(filterBy = { name: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    boards = _filter(boards, filterBy)
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    if (board._id) {
        await storageService.put(STORAGE_KEY, board)
    } else {
        await storageService.post(STORAGE_KEY, board)
    }
    return board
}

async function _createBoards() {
    let boards = await loadFromStorage(STORAGE_KEY)
    if (boards && boards.length !== 0) return
    boards = await boardDemoDataService.createDemoBoards()
    saveToStorage(STORAGE_KEY, boards)
}

function _filter(boards, filterBy) {
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    return boards
}