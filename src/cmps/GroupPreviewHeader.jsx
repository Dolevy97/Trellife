import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { updateGroup } from '../store/actions/group.actions'

import closeIcon from '../assets/imgs/Icons/close.svg'
import expandIcon from '../assets/imgs/Icons/expand.svg'
import collapseIcon from '../assets/imgs/Icons/collapse.svg'
import arrowDownIcon from '../assets/imgs/Icons/arrow-down.svg'
import arrowUpIcon from '../assets/imgs/Icons/arrow-up.svg'
import dotsIcon from '../assets/imgs/Icons/3dots.svg'

export function GroupPreviewHeader({ group, setOpenMenuGroupId, openMenuGroupId, onAddTaskClick }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(group.title)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const menuRef = useRef(null)
    const colors = [
        '#04120d', '#344563', '#1A6ED8',  // Refined blue
        '#a37d1f',  // Softer gold
        '#C26A3E',  // Muted orange
        '#B84A45',  // Softened red
        '#3A8CA0',  // Calmer teal
        '#7B6CC1',  // Lighter purple
        '#216e4e',  // Brighter green
        '#3B7AC5'
    ]

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
        setNewTitle(titleToSet)
        setIsEditing(false)
        await updateBoard(updatedBoard)
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
        setOpenMenuGroupId(null)
        await updateBoard(updatedBoard)
    }

    async function handleColorChange(color) {
        let updatedStyle = { ...group.style };
        if (color === 'remove') {
            delete updatedStyle.backgroundColor;
        } else {
            updatedStyle.backgroundColor = color;
        }

        const updatedGroup = {
            ...group,
            style: updatedStyle
        };
        const newBoard = await updateGroup(updatedGroup.id, updatedGroup, board);
        setIsColorPickerOpen(false);
        setOpenMenuGroupId(null);
    }

    async function toggleCollapse() {
        const updatedGroup = {
            ...group,
            style: {
                ...group.style,
                isCollapse: !group.style.isCollapse
            }
        };
        await updateGroup(updatedGroup.id, updatedGroup, board);
    }

    return (
        <header className={`group-preview-header`}>
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
                <span className='header-title' onClick={() => setIsEditing(true)}>
                    {group.title} {group.style.isCollapse && `(${group.tasks.length})`}


                </span>
            )}
            <div className='header-svg-container'>
                <div onClick={toggleCollapse} className='collapse-wrapper' >
                    <img
                        className='collapse-icon'
                        src={group.style.isCollapse ? expandIcon : collapseIcon}
                        alt={group.style.isCollapse ? "expand" : "collapse"}
                        title={group.style.isCollapse ? "expand" : "collapse"}

                    />
                </div>
                <div onClick={toggleOptions} className='three-dots-wrapper'>
                    <img
                        className='svg-size three-dots-icon'
                        src={dotsIcon}
                        alt="options"
                    />
                </div>
            </div>
            {openMenuGroupId === group.id && (
                <div ref={menuRef} className="header-options-menu">
                    <header className='menu-header'>
                        List actions
                        <div className="close-btn-wrapper" onClick={toggleOptions}>
                            <img src={closeIcon} alt="" />
                        </div>
                    </header>

                    <div className='menu-info'>
                        <p><span onClick={onAddTaskClick}>Add card</span></p>
                        <hr className='menu-header-hr' />
                        <div className="color-picker-accordion">
                            <p className='color-picker-container' onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
                                <span className='color-picker-btn' >
                                    Change color list
                                </span>
                                <span className='color-picker-arrow'>{isColorPickerOpen ? <img src={arrowUpIcon} /> :
                                    <img src={arrowDownIcon} alt="" />}</span>
                            </p>
                            {isColorPickerOpen && (
                                <div className="colors-grid">
                                    {colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(color)}
                                        />
                                    ))}
                                    <span className='remove-group-bgc' onClick={() => handleColorChange('remove')}>Remove Color</span>
                                </div>
                            )}
                        </div>
                        <hr className='menu-header-hr' />
                        <footer onClick={onDeleteGroup} className='menu-footer'>
                            <span>Delete</span>
                        </footer>
                    </div>
                </div>
            )}
        </header>
    )
}