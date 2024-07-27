import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getCmdAddBoard, loadBoards, setFilterBy, setSortBy } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { BoardList } from '../cmps/BoardList'
import { Filter } from '../cmps/BoardFilter'
import { SOCKET_EVENT_BOARD_ADDED, socketService } from '../services/socket.service'
import { useDispatch } from 'react-redux'

export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BOARD_ADDED, addedBoard => dispatch(getCmdAddBoard(addedBoard)))
        return () => {
            socketService.off(SOCKET_EVENT_BOARD_ADDED)
        }
    }, [])

    useEffect(() => {
        loadBoards(filterBy, sortBy)
    }, [filterBy, sortBy])

    function onSetSort(sort) {
        setSortBy(sort)
    }

    function onSetFilter(filter) {
        setFilterBy(filter)
    }

    return (
        <main className="board-index">
            <header>
                <div className="workspace">
                    <div className="workspace-icon">T</div>
                    <div className="workspace-text">
                        <h3>Trellife</h3>
                    </div>
                </div>
            </header>
            <hr className='horizontal-rule' />

            <section className="board-main">
                <h2 className='boards-header'>Boards</h2>
                <section>
                    <Filter filterBy={filterBy} onSetFilter={onSetFilter} sortBy={sortBy} onSetSort={onSetSort} />
                </section>
                <BoardList
                    boards={boards}
                />
            </section>
        </main>
    )
}