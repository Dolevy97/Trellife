import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { loadBoard, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { GroupPreview } from "../cmps/GroupPreview.jsx"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardDetailsHeader } from '../cmps/BoardDetailsHeader.jsx'
import { store } from '../store/store.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { guestLogin } from '../store/actions/user.actions.js'
// import { socketService } from '../services/socket.service.js'

export function BoardDetails() {

  const user = useSelector(storeState => storeState.userModule.user)
  const board = useSelector(storeState => storeState.boardModule.board)

  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')
  const [areLabelsExpanded, setAreLabelsExpanded] = useState(false)

  const groupListContainer = useRef()
  const groupListHeader = useRef()
  const addGroupRef = useRef(null)

  const { boardId } = useParams()

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  useEffect(() => {
    if (!user) {
      guestLogin()
    }
  }, [user])

  useEffect(() => {
    if (board && board.style && board.style.background && groupListContainer) {
      groupListContainer.current.style.background = board.style.background
      groupListContainer.current.style.backgroundSize = 'cover'
      groupListHeader.current.style.background = board.style.background
      groupListHeader.current.style.backgroundSize = 'cover'
    }
  }, [board])


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
    const { source, destination, type } = result
    const updatedGroups = Array.from(board.groups)
    if (type === 'GROUP') {
      const [reorderedGroup] = updatedGroups.splice(source.index, 1)
      updatedGroups.splice(destination.index, 0, reorderedGroup)
    } else if (type === 'TASK') {
      const sourceGroup = updatedGroups.find(g => g.id === source.droppableId)
      const destGroup = updatedGroups.find(g => g.id === destination.droppableId)
      const [movedTask] = sourceGroup.tasks.splice(source.index, 1)
      destGroup.tasks.splice(destination.index, 0, movedTask)
    }

    try {
      await updateBoard({ ...board, groups: updatedGroups })
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

  function toggleLabelExpansion(event) {
    event.stopPropagation()
    setAreLabelsExpanded(prev => !prev)
  }


  const groups = board?.groups || []
  if (!board) return null

  return (
    // <section className="main-display-container">
    // <LeftNavBar />
    <section ref={groupListHeader} className='board-details'>
      <BoardDetailsHeader />
      <section ref={groupListContainer} className="group-list-container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='groups' direction='horizontal' type='GROUP'>
            {(provided) => (
              board && (
                <div className='group-container' {...provided.droppableProps} ref={provided.innerRef}>
                  {groups.map((group, index) => (
                    <Draggable key={group.id} draggableId={group.id.toString()} index={index} type='GROUP'>
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
                            handleOnDragEnd={handleOnDragEnd}
                            toggleLabelExpansion={toggleLabelExpansion}
                            areLabelsExpanded={areLabelsExpanded}

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
    // </section>
  )
}
