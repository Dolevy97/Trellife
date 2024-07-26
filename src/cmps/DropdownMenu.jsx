import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { updateUser } from "../store/actions/user.actions";

export function DropdownMenu({ menu, setIsMenuOpen, isMenuOpen }) {
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
        console.log('star clicked!')
        if (!user.favorites.includes(boardId)) user.favorites.push(boardId)
        else {
            user.favorites = user.favorites.filter(id => id !== boardId)
        }
        await updateUser(user)
    }



    function renderMenuContent() {
        switch (menu) {
            case 'Boards':

                return (
                    <div className="menu-content">
                        <ul>
                            {boards.map(board => (
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
                                            classname={`star-icon`}
                                            src={user.favorites.includes(board._id) ? "../../../src/assets/imgs/Icons/fullstar.svg" : '../../../src/assets/imgs/Icons/star.svg'}
                                            onClick={ev => onClickStar(ev, board._id)}
                                        >
                                        </img>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )

            case 'Recent':
                return (
                    <div className="menu-content">
                        <ul>
                            <li style={{ cursor: 'default' }}>No recent boards to show</li>
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
                                            classname={`star-icon`}
                                            src={user.favorites.includes(board._id) ? "../../../src/assets/imgs/Icons/fullstar.svg" : '../../../src/assets/imgs/Icons/star.svg'}
                                            onClick={ev => onClickStar(ev, board._id)}
                                        >
                                        </img>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {!filteredBoards.length && <>
                            <img className="no-starred-image" src="https://trello.com/assets/cc47d0a8c646581ccd08.svg" alt="Starred board" className="EZxUf8UFUR9nEe" />
                            <p className="no-starred">Star important boards to access them quickly and easily.</p>
                        </>}
                    </div>

                )


            case 'Templates':
                return (
                    <div className="menu-content">
                        <ul>
                            <li style={{ cursor: 'default' }}>No templates to show</li>
                        </ul>
                    </div>
                )


            default:
                return null
        }
    }
    return (
        <div className={`dropdown-menu ${menu}`} ref={dropdownRef}>
            {renderMenuContent()}
        </div>
    )
}