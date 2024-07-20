import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardMsg, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { GroupPreview } from "../cmps/GroupPreview.jsx"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  async function onClickStar(ev) {
    ev.stopPropagation()
    ev.preventDefault()

    const updatedBoard = { ...board, isStarred: !board.isStarred }

    try {
      setBoard(updatedBoard)
      await updateBoard(updatedBoard)
    } catch (error) {
      console.error('Failed to update board:', error)
      setBoard(board)
    }
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return

    const updatedGroups = Array.from(board.groups)
    const [reorderedItem] = updatedGroups.splice(result.source.index, 1)
    updatedGroups.splice(result.destination.index, 0, reorderedItem)

    const updatedBoard = { ...board, groups: updatedGroups }
    setBoard(updatedBoard)

    try {
      const updatedBoardFromServer = await updateBoard(updatedBoard)
      setBoard(updatedBoardFromServer)
    } catch (err) {
      console.error('Failed to update board:', err)
    }
  }

  const groups = board?.groups || []
  if (!board) return null

  return (
    <section style={{ background: board.style.background }} >
      <header className='groups-header'>
        <div className='groups-header-leftside'>
          <span className='groups-header-logo'>{board.title}</span>
          <div
            className='star-container'
            onClick={onClickStar}
            title='Click to star or unstar this board. Starred boards show up at the top of your boards list.'
          >
            <img
              className={`groupsheader-preview-star ${board.isStarred ? 'starred' : ''}`}
              src={board.isStarred ? "../src/assets/styles/imgs/Icones/fullstar.svg" : '../src/assets/styles/imgs/Icones/star.svg'}
              alt="star icon"
            />
          </div>
        </div>
        <div className='groups-header-rightside'>
          <img className='user-img' src="../../../src\assets\imgs\user-imgs\user-img1.jpg" alt="user" />
          <img className='user-img' src="../../../src\assets\imgs\user-imgs\user-img2.jpeg" alt="user" />
          <span className='member-img'><span>DL</span></span>
        </div>
      </header>


      <section className="group-list-container" style={{ background: board.style.background }} >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='groups' direction='horizontal'>
            {(provided) => (
              board && (
                <div className='group-container' {...provided.droppableProps} ref={provided.innerRef}>
                  {groups.map((group, index) => (
                    <Draggable key={group.id} draggableId={group.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`group-item ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          <GroupPreview
                            key={group.id}
                            boardId={boardId}
                            group={group}
                            board={board}
                            setBoard={setBoard}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {/* drag end point */}
                  {provided.placeholder}
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
              ))

            }

          </Droppable>
        </DragDropContext>
        <Outlet />
      </section>
    </section>
  )
}