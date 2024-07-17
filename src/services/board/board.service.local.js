
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'

const STORAGE_KEY = 'board'

_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg
}

window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    }
    if (minSpeed) {
        boards = boards.filter(board => board.speed >= minSpeed)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        boards.sort((board1, board2) =>
            board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        boards.sort((board1, board2) =>
            (board1[sortField] - board2[sortField]) * +sortDir)
    }

    boards = boards.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
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
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
            name: board.name
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            name: board.name
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        id: makeId(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

async function _createBoards() {
    let boards = await loadFromStorage(STORAGE_KEY)
    if (boards && boards.length !== 0) return
    boards = [
        {
            title: 'Demo 1',
            isStarred: false,
            archivedAt: null,
            createdBy: {
                _id: 'u101',
                fullname: 'Dolev Levy',
                imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            },
            style: {
                backgroundImage: '',
            },
            labels: [
                {
                    id: 'l101',
                    title: 'Done',
                    color: '#61bd4f',
                },
                {
                    id: 'l102',
                    title: 'Progress',
                    color: '#61bd33',
                },
            ],
            members: [
                {
                    _id: 'u101',
                    fullname: 'Dolev Levy',
                    imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                }
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'Group 1',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 'c101',
                            title: 'Replace logo',
                        },
                        {
                            id: 'c102',
                            title: 'Add Samples',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'Group 2',
                    tasks: [
                        {
                            id: 'c103',
                            title: 'Do that',
                            archivedAt: 1589983468418,
                        },
                        {
                            id: 'c104',
                            title: 'Help me',
                            status: 'inProgress', // monday / both
                            priority: 'high', // monday / both
                            dueDate: '2024-09-24',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    title: 'also @yaronb please CR this',
                                    createdAt: 1590999817436,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Tal Tarablus',
                                        imgUrl: '',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhmF',
                                    title: 'Checklist',
                                    todos: [
                                        {
                                            id: '212jX',
                                            title: 'To Do 1',
                                            isDone: false,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u101'],
                            labelIds: ['l101', 'l102'],
                            byMember: {
                                _id: 'u101',
                                fullname: 'Tal Tarablus',
                                imgUrl: '',
                            },
                            style: {
                                backgroundColor: '#26de81',
                            },
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    title: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Abi Abambi',
                        imgUrl: 'http://some-img',
                    },
                    group: {
                        id: 'g101',
                        title: 'Urgent Stuff',
                    },
                    task: {
                        id: 'c101',
                        title: 'Replace Logo',
                    },
                },
            ],

            // For Monday draggable columns (optional)
            cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
        }
    ]
    saveToStorage(STORAGE_KEY, boards)
}