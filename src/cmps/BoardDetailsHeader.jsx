import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { RightNavBar } from '../cmps/RightNavBar';
import { showSuccessMsg } from '../services/event-bus.service'
import { updateUser } from '../store/actions/user.actions';

import star from '../assets/imgs/Icons/star.svg'
import fullStar from '../assets/imgs/Icons/fullstar.svg'
import filter from "../assets/imgs/Icons/filter.svg"
import share from "../assets/imgs/Icons/share.svg"
import dots from "../assets/imgs/icons/3dots.svg"
import { getAverageColorFromAttachment, getAverageColorFromUrl, isLightColor } from '../services/util.service';
import autosize from 'autosize';

export function BoardDetailsHeader({ isRightNavBarOpen, setIsRightNavBarOpen, setIsFilterOpen, isFilterOpen, onFilterClick,
  filterButtonRef }) {
  const board = useSelector(storeState => storeState.boardModule.board)
  const user = useSelector(storeState => storeState.userModule.user)

  const boardTitleRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(board.title)
  const [buttonColor, setButtonColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const [iconColor, setIconColor] = useState({})
  const [inputWidth, setInputWidth] = useState(() => `${Math.max(board.title.length * 9, 100)}px`);

  useEffect(() => {
    if (board) {
      setNewTitle(board.title)
    }
  }, [board])

  useEffect(() => {
    updateInputWidth()
  }, [newTitle])


  function updateInputWidth() {
    if (boardTitleRef.current) {
      const newWidth = Math.max(newTitle.length * 9, 100) // Minimum width of 100px
      setInputWidth(`${newWidth}px`)
    }
  }

  useEffect(() => {
    async function updateButtonColor() {
      try {
        const avgColor = await getAverageColorFromUrl(board.style)
        setButtonColor(isLightColor(avgColor) ? '#091e42e3' : '#DCDFE4')
        setTextColor(isLightColor(avgColor) ? '#FFFFFF' : '#172B4D')
        setIconColor(isLightColor(avgColor) ?
          { filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7489%) hue-rotate(29deg) brightness(100%) contrast(103%)' }
          :
          { filter: 'brightness(0) saturate(100%) invert(12%) sepia(53%) saturate(1411%) hue-rotate(192deg) brightness(94%) contrast(92%)' })
      } catch (error) {
        console.error('Error getting average color:', error)
        setButtonColor('transparent')
        setTextColor('#000000')
      }
    }

    updateButtonColor()
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
      setNewTitle(titleToSet)
      setIsEditing(false)
      await updateBoard(updatedBoard)
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
    if (!user.favorites.includes(board._id)) user.favorites.push(board._id)
    else {
      user.favorites = user.favorites.filter(id => id !== board._id)
    }
    await updateUser(user)
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

  function toggleRightNavBar() {
    setIsRightNavBarOpen(!isRightNavBarOpen)
    setIsFilterOpen(false)
  }

  function toggleFilterOpen() {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <section className={`groups-header ${isRightNavBarOpen ? 'right-nav-open' : ''}`}>
      <div className='groups-header-leftside'>
        {isEditing ? (
          <input
            ref={boardTitleRef}
            value={newTitle}
            onChange={(ev) => setNewTitle(ev.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className='groups-title-input'
            style={{ width: inputWidth }}
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className='groups-header-title'>{board.title}</span>
        )}
        <div
          className='star-container'
          onClick={onClickStar}
          title='Click to star or unstar this board. Starred boards show up at the top of your boards list.'
        >
          <img
            className={`groupsheader-preview-star ${user.favorites.includes(board._id) ? 'starred' : ''}`}
            src={user.favorites.includes(board._id) ? fullStar : star}
            alt="star icon"
          />
        </div>
      </div>
      <div className='groups-header-rightside'>
        <div className='filter-container' onClick={toggleFilterOpen} >
          <img src={filter} />
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
        <button
          onClick={onShareJoinClick}
          className='btn-share-join'
          style={{
            backgroundColor: buttonColor,
            color: textColor
          }}
        >
          <img className="share-join-icon" src={share} style={iconColor}></img>
          <span className='share-join-text'>{canUserJoinBoard() ? 'Share' : 'Join'}</span></button>
        {!isRightNavBarOpen && (
          <div className='open-right-nav-wrapper'>
            <img
              onClick={toggleRightNavBar}
              src={dots} alt=""
              className='open-right-nav-icon' />
          </div>

        )}
      </div>
    </section>
  )
}
