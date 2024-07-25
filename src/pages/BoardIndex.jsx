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
                    <Filter filterBy={filterBy} setFilterBy={setFilterBy} />
                </section>
                <BoardList
                    boards={boards}
                />
            </section>
        </main>
    )
}