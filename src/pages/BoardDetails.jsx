import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { loadBoard, updateBoard, removeBoard, filterBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board/'
import { GroupPreview } from "../cmps/GroupPreview.jsx"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardDetailsHeader } from '../cmps/BoardDetailsHeader.jsx'

import { RightNavBar } from '../cmps/RightNavBar'

import { BoardHederFilter } from '../cmps/BoardHederFilter.jsx'
import { login } from '../store/actions/user.actions.js'
// import { socketService } from '../services/socket.service.js'

import loadingAnimation from '../assets/imgs/TaskDetails-icons/loading animation.svg'
import closeIcon from '../assets/imgs/Icons/close.svg'
import addIcon from '../assets/imgs/Icons/add.svg'

export function BoardDetails() {

  const user = useSelector(storeState => storeState.userModule.user)
  const board = useSelector(storeState => storeState.boardModule.board)
  const navigate = useNavigate()

  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')
  const [areLabelsExpanded, setAreLabelsExpanded] = useState(false)
  const [isRightNavBarOpen, setIsRightNavBarOpen] = useState(false)
  const [areAllGroupsCollapsed, setAreAllGroupsCollapsed] = useState(false)

  const groupListContainer = useRef()
  const groupListHeader = useRef()
  const addGroupRef = useRef(null)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterBy, setFilterBy] = useState({
    ...boardService.getDefaultFilter(),
    memberIds: [],
    labelIds: []
  })
  const [filteredBoard, setFilteredBoard] = useState(null)

  const { boardId } = useParams()



  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  useEffect(() => {
    if (board) {
      const filtered = filterBoard(board, filterBy)
      setFilteredBoard(filtered)
    }
  }, [filterBy, board])

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

  async function guestLogin() {
    await login({ username: 'Guest', password: '1234' })
  }

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

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAddGroup()
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

  function toggleLabelExpansion(event) {
    event.stopPropagation()
    setAreLabelsExpanded(prev => !prev)
  }

  async function toggleAllGroupsCollapse() {
    const newCollapseState = !areAllGroupsCollapsed
    const updatedGroups = board.groups.map(group => ({
      ...group,
      style: {
        ...group.style,
        isCollapse: newCollapseState
      }
    }))

    const updatedBoard = {
      ...board,
      groups: updatedGroups
    }

    await updateBoard(updatedBoard)
    setAreAllGroupsCollapsed(newCollapseState)
  }

  const groups = filteredBoard?.groups || board?.groups || []
  //needs layers
  if (!board) return <div className='isloading-container'> <img className='isLoading' src={loadingAnimation} /> </div> 

  return (
    // <section className="main-display-container">
    // <LeftNavBar />
    <section ref={groupListHeader} className='board-details'>
      <BoardDetailsHeader
        isRightNavBarOpen={isRightNavBarOpen}
        setIsRightNavBarOpen={setIsRightNavBarOpen}

        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      <RightNavBar
        onClose={() => setIsRightNavBarOpen(false)}
        isRightNavBarOpen={isRightNavBarOpen}
        setIsRightNavBarOpen={setIsRightNavBarOpen}
        toggleAllGroupsCollapse={toggleAllGroupsCollapse}
        board={board}
      />

      {isFilterOpen &&
        <BoardHederFilter
          onClose={() => setIsFilterOpen(false)}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          board={board}

        />
      }
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
                            <img src={closeIcon} alt="" />
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className='add-group' onClick={() => setIsAddingGroup(true)}>
                      <img src={addIcon} alt="add" />
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
