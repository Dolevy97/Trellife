import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { updateUser } from "../store/actions/user.actions"

import star from '../assets/imgs/Icons/star.svg'
import fullStar from '../assets/imgs/Icons/fullstar.svg'


export function DropdownMenu({ menu, setIsMenuOpen, isMenuOpen, position }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const user = useSelector(storeState => storeState.userModule.user)
    const dropdownRef = useRef(null)

    const navigate = useNavigate()

    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    async function onClickStar(ev, boardId) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!user.favorites.includes(boardId)) user.favorites.push(boardId)
        else {
            user.favorites = user.favorites.filter(id => id !== boardId)
        }
        await updateUser(user)
    }

    function sortBoardsByRecent() {
        return boards.sort((a, b) => {
            const aLastActivity = a.activities[a.activities.length - 1]
            const bLastActivity = b.activities[b.activities.length - 1]

            return bLastActivity.createdAt - aLastActivity.createdAt
        })
    }

    function renderMenuContent() {
        switch (menu) {
            // case 'Boards':
            //     return (
            //         <div className="menu-content">
            //             <ul>
            //                 {boards.map(board => (
            //                     <li
            //                         key={board._id}
            //                         className='menu-list'
            //                         onClick={() => {
            //                             navigate(`/board/${board._id}`)
            //                             setIsMenuOpen(false)
            //                         }}>
            //                         <div className="board-bg" style={board.style}></div>
            //                         <div className="menu-text">{board.title} </div>
            //                         <div className={`star-icon-container ${user.favorites.includes(board._id) ? 'is-starred' : ''}`}>
            //                             <img
            //                                 className={`star-icon`}
            //                                 src={user.favorites.includes(board._id) ? fullStar : star}
            //                                 onClick={ev => onClickStar(ev, board._id)}
            //                             >
            //                             </img>
            //                         </div>
            //                     </li>
            //                 ))}
            //             </ul>
            //         </div>
            //     )
            case 'Recent':
                const sortedboards = sortBoardsByRecent()
                return (
                    <div className="menu-content">
                        <ul>
                            {sortedboards.map(board => (
                                <li
                                    key={board._id}
                                    className='menu-list'
                                    onClick={() => {
                                        navigate(`/board/${board._id}`)
                                        setIsMenuOpen(false)
                                    }}>
                                    <div className="board-bg" style={board.style}></div>
                                    <div className="menu-text">{board.title} </div>
                                    <div className={`star-icon-container ${user.favorites.includes(board._id) ? 'is-starred' : ''}`}>
                                        <img
                                            className={`star-icon`}
                                            src={user.favorites.includes(board._id) ? fullStar : star}
                                            onClick={ev => onClickStar(ev, board._id)}
                                        >
                                        </img>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            case 'Starred':
                const filteredBoards = boards.filter(board => user.favorites.includes(board._id))
                return (
                    <div className="menu-content">
                        <ul>
                            {filteredBoards.map(board => (
                                <li key={board._id} className='menu-list' onClick={() => {
                                    navigate(`/board/${board._id}`)
                                    setIsMenuOpen(false)
                                }}>
                                    <div className="board-bg" style={board.style}></div>
                                    <div className="menu-text">{board.title} </div>
                                    <div className={`star-icon-container ${user.favorites.includes(board._id) ? 'is-starred' : ''}`}>
                                        <img
                                            className={`star-icon`}
                                            src={user.favorites.includes(board._id) ? fullStar : star}
                                            onClick={ev => onClickStar(ev, board._id)}
                                        >
                                        </img>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {!filteredBoards.length && <>
                            <img className="no-starred-image" src="https://trello.com/assets/cc47d0a8c646581ccd08.svg" alt="Starred board" />
                            <p className="no-starred">Star important boards to access them quickly and easily.</p>
                        </>}
                    </div>

                )
            default:
                return null
        }
    }
    return (
        <div
            className={`dropdown-menu ${menu}`}
            ref={dropdownRef}
            style={{
                position: 'fixed',
                top: `${position.top + 8}px`,
                left: `${position.left}px`
            }}
        >
            {renderMenuContent()}
        </div>
    )
}