import { useState, useEffect } from 'react'

export function BoardDetailsHeader({ board, setBoard, updateBoard }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(board.title)

  useEffect(() => {
    if (board) {
      setNewTitle(board.title)
    }
  }, [board])

  function handleTitleInputChange(event) {
    setNewTitle(event.target.value)
  }

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
      const savedBoard = await updateBoard(updatedBoard)
      setBoard(savedBoard)
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
      setBoard(updatedBoard)
      await updateBoard(updatedBoard)
    } catch (error) {
      console.error('Failed to update board:', error)
      setBoard(board)
    }
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
        <div className='members-container'>
          <img className='user-img' src="../../../src/assets/imgs/user-imgs/user-img1.jpg" alt="user" />
          <img className='user-img' src="../../../src/assets/imgs/user-imgs/user-img2.jpg" alt="user" />
          <img className='user-img' src="../../../src/assets/imgs/user-imgs/user-img3.jpg" alt="user" />
        </div>

      </div>
    </section>
  )
}