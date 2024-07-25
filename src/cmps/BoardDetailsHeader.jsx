import { useState, useEffect } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { showSuccessMsg } from '../services/event-bus.service'

export function BoardDetailsHeader() {
  const board = useSelector(storeState => storeState.boardModule.board)
  const user = useSelector(storeState => storeState.userModule.user)

  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(board.title)

  useEffect(() => {
    if (board) {
      setNewTitle(board.title)
    }
  }, [board])

  async function handleTitleUpdate() {
    let titleToSet = newTitle.trim()
    if (titleToSet === '') {
      titleToSet = board.title
    }
    const updatedBoard = {
      ...board,
      title: titleToSet
    }
    try {
      await updateBoard(updatedBoard)
      setNewTitle(titleToSet)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update board title:', error)
    }
  }

  async function handleBlur() {
    await handleTitleUpdate()
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleTitleUpdate()
    }
  }

  async function onClickStar(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    const updatedBoard = { ...board, isStarred: !board.isStarred }

    try {
      await updateBoard(updatedBoard)
    } catch (error) {
      console.error('Failed to update board:', error)
    }
  }

  async function onShareJoinClick() {
    const userIsInBoard = canUserJoinBoard()
    if (!userIsInBoard) {
      board.members.push(user)
      await updateBoard(board)
      return
    }
    const currentURL = window.location.href

    try {
      await navigator.clipboard.writeText(currentURL)
      showSuccessMsg('Board link copied to clipboard')
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  function canUserJoinBoard() {
    return board.members.find(u => u._id === user._id)
  }

  return (
    <section className='groups-header'>
      <div className='groups-header-leftside'>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(ev) => setNewTitle(ev.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className='groups-header-logo'>{board.title}</span>
        )}
        <div
          className='star-container'
          onClick={onClickStar}
          title='Click to star or unstar this board. Starred boards show up at the top of your boards list.'
        >
          <img
            className={`groupsheader-preview-star ${board.isStarred ? 'starred' : ''}`}
            src={board.isStarred ? "../../../src/assets/imgs/Icons/fullstar.svg" : '../../../src/assets/imgs/Icons/star.svg'}
            alt="star icon"
          />
        </div>
      </div>
      <div className='groups-header-rightside'>
        <div className='filter-container'>
          <img src="../../../src\assets\imgs\Icons\filter.svg" />
          <span>Filters</span>
        </div>
        <span className="sep">

        </span>
        <div className='members-container'>
          {board.members.map((member, idx, members) => {
            return <img
              key={member._id}
              className='user-img-header'
              src={member.imgUrl}
              alt="user image"
              title={member.fullname}
              style={{ zIndex: members.length - idx }} />
          })}
        </div>
        <button onClick={onShareJoinClick} className='btn-share-join'>
          <img className="share-join-icon" src="../../../src\assets\imgs\Icons\share.svg"></img>
          <span className='share-join-text'>{canUserJoinBoard() ? 'Share' : 'Join'}</span></button>
        <img src="../../../src\assets\imgs\Icons\3dots.svg" alt="" />

      </div>
    </section>
  )
}
