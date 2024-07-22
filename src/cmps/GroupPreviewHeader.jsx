import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { updateGroup } from '../store/actions/group.actions'
import { GroupAction } from '../cmps/GroupAction';
export function GroupPreviewHeader({ group, setOpenMenuGroupId, openMenuGroupId, onAddTaskClick }) {
    const board = useSelector(storeState => storeState.boardModule.board)



    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(group.title)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

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

    async function TitleUpdate() {
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
        await TitleUpdate()
    }

    async function handleTitleKeyPress(event) {
        if (event.key === 'Enter') {
            await TitleUpdate()
        }
    }

    function toggleOptions(event) {
        event.stopPropagation()
        setOpenMenuGroupId(prevId => prevId === group.id ? null : group.id)
        setIsColorPickerOpen(false)

    }

    async function onDeleteGroup() {
        const updatedBoard = {
            ...board,
            groups: board.groups.filter(g => g.id !== group.id)
        }
        await updateBoard(updatedBoard)
        setOpenMenuGroupId(null)
    }

    async function handleColorChange(color) {
        const updatedGroup = {
            ...group,
            style: { ...group.style, backgroundColor: color }
        }
      const newBoard =  await updateGroup(updatedGroup.id, updatedGroup, board)
        setIsColorPickerOpen(false)
        setOpenMenuGroupId(null)
        console.log(newBoard);
    }

    return (
        <header className='group-preview-header' >
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyPress={handleTitleKeyPress}
                    autoFocus
                />
            ) : (
                <span onClick={() => setIsEditing(true)}>{group.title}</span>
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
                    <p><span onClick={onAddTaskClick}>Add task</span></p>
                    <p><span onClick={() => {
                        console.log("Color picker state before:", isColorPickerOpen);
                        setIsColorPickerOpen(!isColorPickerOpen);
                        console.log("Color picker state after:", !isColorPickerOpen);
                    }}>Pick color</span></p>
                    <GroupAction
                        onColorChange={handleColorChange}
                        isOpen={isColorPickerOpen}
                        onClose={() => setIsColorPickerOpen(false)}
                    />
                    <footer className='options-menu-footer'>
                        <span onClick={onDeleteGroup}>Delete</span>
                    </footer>
                </div>
            )}
        </header>
    )
}