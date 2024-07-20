const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, getRandomTimestamp } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: null,
        createdBy: {},
        style: {
            backgroundImage: 'https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        labels: [],
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: [],
    }

}

function getDefaultFilter() {
    return {
        title: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyTask,getEmptyGroup, getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

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
        status: '',
        priority: '',
        dueDate: null,
        description: '',
        checklists: [{}],
        membersIds: [],
        labelsIds: [],
        byMember: {},
        style: {}


    }
}

if (DEV) window.boardService = boardService

