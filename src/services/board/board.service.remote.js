import { httpService } from '../http.service'

const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = {}, sortBy = { field: 'activity', dir: -1 }) {
    const filterAndSort = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterAndSort)
}

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(BASE_URL + board._id, board)
    } else {
        savedBoard = await httpService.post(BASE_URL, board)
    }
    return savedBoard
}