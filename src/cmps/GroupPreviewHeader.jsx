import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function GroupPreviewHeader({ group, setOpenMenuGroupId, openMenuGroupId }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(group.title)
    const menuRef = useRef(null)

    useEffect(() => {
        setNewTitle(group.title)
    }, [group.title])

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuGroupId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setOpenMenuGroupId])

    async function handleTitleUpdate() {
        let titleToSet = newTitle.trim()
        if (titleToSet === '') {
            titleToSet = group.title
        }
        const updatedBoard = {
            ...board,
            groups: board.groups.map(g =>
                g.id === group.id ? { ...g, title: titleToSet } : g
            )
        }
        await updateBoard(updatedBoard)
        setNewTitle(titleToSet)
        setIsEditing(false)
    }

    async function handleTitleBlur() {
        await handleTitleUpdate()
    }

    async function handleTitleKeyPress(event) {
        if (event.key === 'Enter') {
            await handleTitleUpdate()
        }
    }

    function toggleOptions(event) {
        event.stopPropagation()
        setOpenMenuGroupId(prevId => prevId === group.id ? null : group.id)
    }

    async function handleDeleteGroup() {
        const updatedBoard = {
            ...board,
            groups: board.groups.filter(g => g.id !== group.id)
        }
        await updateBoard(updatedBoard)
        setOpenMenuGroupId(null)
    }

    return (
        <header className='group-preview-header'>
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e)=> setNewTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyPress={handleTitleKeyPress}
                    autoFocus
                />
            ) : (
                <span onClick={()=>setIsEditing(true)}>{group.title}</span>
            )}
            <div className='header-svg-container'>
                <img className='' src="../../../src/assets/imgs/Icons/collapse.svg" alt="collapse" />
                <div onClick={toggleOptions} className='three-dots-btn-wrapper'>
                    <img
                        className='svg-size three-dots-open'
                        src="../../../src/assets/imgs/Icons/3dots.svg"
                        alt="options"
                    />
                </div>
            </div>
            {openMenuGroupId === group.id && (
                <div ref={menuRef} className="header-options-menu">
                    <header className='options-menu-header'>
                        List actions
                        <div className="close-btn-wrapper" onClick={toggleOptions}>
                            <img src="../../../src/assets/imgs/Icons/close.svg" alt="" />
                        </div>
                    </header>
                    <p><span>Add card</span></p>
                    <p><span>Pick color</span></p>
                    <footer className='options-menu-footer'>
                        <span onClick={handleDeleteGroup}>Delete</span>
                    </footer>
                </div>
            )}
        </header>
    )
}