import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export function DropdownMenu({ menu, setIsMenuOpen, isMenuOpen }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const dropdownRef = useRef(null);


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


    function renderMenuContent() {
        switch (menu) {
            case 'Boards':

                return (
                    <div className="menu-content">
                        <ul>
                            {boards.map(board => (
                                <li key={board._id} onClick={() => {
                                    navigate(`/board/${board._id}`)
                                    setIsMenuOpen(false)
                                }}>{board.title}</li>
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
                const filteredBoards = boards.filter(board => board.isStarred)
                return (
                    <div className="menu-content">
                        <ul>
                            {filteredBoards.map(board => (
                                <li key={board._id} onClick={() => {
                                    navigate(`/board/${board._id}`)
                                    setIsMenuOpen(false)
                                }}>{board.title}</li>
                            ))}
                        </ul>
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