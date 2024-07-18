import { useState, useEffect } from 'react'
import { updateBoard } from '../store/actions/board.actions'

export function GroupPreviewHeader({ group, board, setBoard }) {
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(group.title)

    function handleTitleClick() {
        setIsEditing(true)
    }

    function handleInputChange(event) {
        setNewTitle(event.target.value)
    }

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
        const savedBoard = await updateBoard(updatedBoard)
        setBoard(savedBoard)
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

    useEffect(() => {
        setNewTitle(group.title)
    }, [group.title])

    return (
        <header className='group-preview-header'>
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={handleInputChange}
                    onBlur={handleTitleBlur}
                    onKeyPress={handleTitleKeyPress}
                    autoFocus
                />
            ) : (
                <span onClick={handleTitleClick}>{group.title}</span>
            )}
            <div>
                <img className='svg-color' src="../src/assets/styles/imgs/Icones/collapse.svg" alt="collapse" />
                <img className='svg-color' src="../src/assets/styles/imgs/Icones/3dots.svg" alt="options" />
            </div>
        </header>
    )
}
