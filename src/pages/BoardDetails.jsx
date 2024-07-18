import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardMsg, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'


import { GroupPreview } from "../cmps/GroupPreview.jsx"

export function BoardDetails() {
  const { boardId } = useParams()
  const boardFromStore = useSelector(storeState => storeState.boardModule.board)
  const [board, setBoard] = useState(boardFromStore)


  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])


  useEffect(() => {
    setBoard(boardFromStore)
  }, [boardFromStore])

  async function handleAddGroup () {
    try {
      const newGroup = boardService.getEmptyGroup()
      const updatedBoard = {
        ...board,
        groups: [...board.groups, newGroup]
      }
      const savedBoard = await updateBoard(updatedBoard)
      setBoard(savedBoard)
    } catch (err) {
      console.error('Failed to add group:', err)
    }
  }

  const groups = board?.groups || []
  if (!board) return
  return (
    <section>
      <header className='groups-header'>
        <div className='groups-header-leftside'>
          <span className='groups-header-logo'> {board.title}</span>
          <span>star</span>
        </div>
        <div className='groups-header-rightside'>

        </div>
      </header>
      <section className="group-list-container">
        <Link className='back-to-boardlist-link' to="/board">Back to list</Link>
        {board && (
          <div className='group-container'>
            {groups.map(group => (
              <GroupPreview key={group.id}  boardId={boardId} group={group} board={board} setBoard={setBoard}  />
            ))}
            <div className='add-group' onClick={handleAddGroup}>
              <span> + Add another list </span>
            </div>
          </div>
        )}

        <Outlet />

      </section>
    </section>
  )
}