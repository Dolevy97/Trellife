import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardMsg, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { GroupPreview } from "../cmps/GroupPreview.jsx"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardDetailsHeader } from '../cmps/BoardDetailsHeader.jsx'

export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')

  const addGroupRef = useRef(null)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])


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

  async function onAddGroup() {
    if (!newGroupTitle.trim()) return

    try {
      const newGroup = boardService.getEmptyGroup()
      newGroup.title = newGroupTitle.trim()
      const updatedBoard = {
        ...board,
        groups: [...board.groups, newGroup]
      }
      const savedBoard = await updateBoard(updatedBoard)
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

  async function handleOnDragEnd(result) {
    if (!result.destination) return

    const updatedGroups = Array.from(board.groups)
    const [reorderedItem] = updatedGroups.splice(result.source.index, 1)
    updatedGroups.splice(result.destination.index, 0, reorderedItem)

    const updatedBoard = { ...board, groups: updatedGroups }

    try {
      await updateBoard(updatedBoard)
    } catch (err) {
      console.error('Failed to update board:', err)
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAddGroup()
    }
  }

  const groups = board?.groups || []
  if (!board) return null

  return (
    <section style={{ background: board.style.background, backgroundSize: 'cover' }}>
      <BoardDetailsHeader />
      <section className="group-list-container" style={{ background: board.style.background, backgroundSize: 'cover' }}>
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
                          onChange={(e) => setNewGroupTitle(e.target.value)}
                          autoFocus
                          placeholder="Enter list title..."
                          onKeyPress={handleKeyPress}
                        />
                        <div className='addgroup-btns'>
                          <span onClick={onAddGroup}>Add list</span>
                          <div className="close-btn-wrapper" onClick={() => {
                            setIsAddingGroup(false)
                            setNewGroupTitle('')
                          }}>
                            <img src="../../../src/assets/imgs/Icons/close.svg" alt="" />
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className='add-group' onClick={() => setIsAddingGroup(true)}>
                      <img src="../../../src/assets/imgs/Icons/add.svg" alt="add" />
                      <span>Add another list</span>
                    </div>
                  )}
                </div>
              )
            )}
          </Droppable>
        </DragDropContext>
        <Outlet />
      </section>
    </section>
  )
}
