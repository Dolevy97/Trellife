import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardMsg, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { GroupPreview } from "../cmps/GroupPreview.jsx"

export function BoardDetails() {
  const { boardId } = useParams()
  const boardFromStore = useSelector(storeState => storeState.boardModule.board)
  const [board, setBoard] = useState(boardFromStore)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')
  const addGroupRef = useRef(null)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  useEffect(() => {
    setBoard(boardFromStore)
  }, [boardFromStore])

  useEffect(() => {
    function handleClickOutside(event) {
      if (addGroupRef.current && !addGroupRef.current.contains(event.target)) {
        setIsAddingGroup(false)
        setNewGroupTitle('')
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [addGroupRef])


  async function handleAddGroup() {
    if (!newGroupTitle.trim()) return

    try {
      const newGroup = boardService.getEmptyGroup()
      newGroup.title = newGroupTitle.trim()
      const updatedBoard = {
        ...board,
        groups: [...board.groups, newGroup]
      }
      const savedBoard = await updateBoard(updatedBoard)
      setBoard(savedBoard)
      setNewGroupTitle('')

      if (addGroupRef.current) {
        const input = addGroupRef.current.querySelector('input')
        if (input) {
          input.focus()
        }
      }
    } catch (err) {
      console.error('Failed to add group:', err)
    }
  }

  function handleAddGroupClick() {
    setIsAddingGroup(true)
  }

  function handleInputChange(e) {
    setNewGroupTitle(e.target.value)
  }

  function handleTitleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddGroup()
      setNewGroupTitle('')
    }
  }

  const groups = board?.groups || []
  if (!board) return null

  return (
    <section style={{ background: board.style.background }} >
      <header className='groups-header'>
        <div className='groups-header-leftside'>
          <span className='groups-header-logo'>{board.title}</span>
          <img className='empty-star' src="../../../src/assets/styles/imgs/Icones/star.svg" alt="star" />
        </div>
        <div className='groups-header-rightside'>
          <img className='user-img' src="../../../src\assets\imgs\user-imgs\user-img1.jpg" alt="user" />
          <img className='user-img' src="../../../src\assets\imgs\user-imgs\user-img2.jpeg" alt="user" />
          <span className='member-img'></span>
        </div>
      </header>


      <section className="group-list-container" style={{ background: board.style.background }} >
        {board && (
          <div className='group-container'>
            {groups.map(group => (
              <GroupPreview key={group.id} boardId={boardId} group={group} board={board} setBoard={setBoard} />
            ))}
            {isAddingGroup ? (
              <div className='addgroup-from-container' ref={addGroupRef}>
                <form className='addgroup-form' onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    value={newGroupTitle}
                    onChange={handleInputChange}
                    onKeyPress={handleTitleKeyPress}
                    autoFocus
                    placeholder="Enter list title..."
                  />
                  <div className='addgroup-btns'>
                    <span onClick={handleAddGroup}>Add list</span>
                    <div className="close-btn-wrapper" onClick={() => {
                      setIsAddingGroup(false)
                      setNewGroupTitle('')
                    }}>
                      <img src="../../../src/assets/styles/imgs/Icones/close.svg" alt="" />
                    </div>

                  </div>
                </form>
              </div>
            ) : (
              <div className='add-group' onClick={handleAddGroupClick}>
                <img src="../../../src/assets/styles/imgs/Icones/add.svg" alt="add" />
                <span>Add another list</span>
              </div>
            )}
          </div>
        )}
        <Outlet />
      </section>
    </section>
  )
}