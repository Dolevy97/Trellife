import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardMsg } from '../store/actions/board.actions'

import { GroupPreview } from "../cmps/GroupPreview.jsx"

export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  const groups = board?.groups || []

  return (
    <section className="group-list-container">
      <Link className='back-to-boardlist-link' to="/board">Back to list</Link>
      {board && (
        <div className='group-container'>
          {groups.map(group => (
            <GroupPreview key={group.id} boardId={boardId} group={group} />
          ))}

        </div>
      )}

      <Outlet />

    </section>
  )
}