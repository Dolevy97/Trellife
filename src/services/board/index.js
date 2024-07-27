const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, getRandomTimestamp } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyTask, getEmptyGroup, getEmptyBoard, getDefaultFilter, getDefaultSort, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local



function getEmptyBoard() {
    return {
        title: '',
        style: {}
    }
}

function getDefaultFilter() {
    return {
        title: ''
    }
}

function getEmptyGroup(title = 'New List') {
    return {
        id: makeId(),
        title: title,
        tasks: [],
        style: {},
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? getRandomTimestamp() : null,
    }
}


function getEmptyTask() {
    return {
        id: 't' + makeId(),
        title: '',
        isDone: false,
        priority: '',
        dueDate: null,
        description: '',
        checklists: [],
        membersIds: [],
        labelsIds: [],
        byMember: {},
        style: null,
        attachments: []


    }
}

function getDefaultSort() {
    return { field: 'name', dir: 1 }
}

if (DEV) window.boardService = boardService

