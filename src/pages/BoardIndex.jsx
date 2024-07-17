import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'

import { BoardList } from '../cmps/BoardList'
import { Filter } from '../cmps/BoardFilter'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    return (
        <main className="index">
            <header>
                <h2>Boards</h2>
            </header>
            {/* <Filter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <BoardList
                boards={boards} />
        </main>
    )
}