import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board"
import { getRandomMember } from "../services/board/board-demo-data.service"
import { addBoard } from "../store/actions/board.actions"
import { useNavigate } from "react-router"

export function BoardCreate({ setIsAdding }) {
    // const [background, setBackground] = useState(`url(${img})`)
    const [background, setBackground] = useState(`#0079bf`)
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())

    const [isBoardCreateOpen, setIsBoardCreateOpen] = useState(false);
    const boardCreateRef = useRef(null);

    const navigate = useNavigate()


    function handleClickOutside(event) {
        if (boardCreateRef.current && !boardCreateRef.current.contains(event.target)) {
            if (setIsAdding) setIsAdding(false)
            else {
                setIsBoardCreateOpen(false)
                navigate(-1)
            }
        }
    }

    useEffect(() => {
        setIsBoardCreateOpen(true)
        if (isBoardCreateOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isBoardCreateOpen]);

    function onChooseBGColor({ target }) {
        const bgColor = target.style.backgroundColor
        setBackground(bgColor)
    }


    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value = ev.target.value
        setBoardToAdd({ ...boardToAdd, [field]: value })
    }

    async function onAddBoard() {
        const newBoard = { ...boardToAdd, style: { background: background }, createdBy: getRandomMember() }
        if (!newBoard.title) return
        const addedBoard = await addBoard(newBoard)
        if (setIsAdding) setIsAdding(false)
        navigate(`/board/${addedBoard._id}`)
    }

    const { title } = boardToAdd

    return (
        <section className={`board-create ${setIsAdding && 'from-header'}`} ref={boardCreateRef}>
            <article className="create-header">
                <h1>Create board</h1>
            </article>
            <div className="preview-container">
                <div className="preview" style={{ background: background }}>
                    <img src="../src\assets\imgs\add-preview.svg" alt="" />
                </div>
            </div>
            <label htmlFor="bg-picker" className="bg-picker-label">Background</label>
            <section className="bg-picker" id="bg-picker">
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: '#0079bf' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: '#d29034' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: '#519839' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'skyblue' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: '#4bbf6b' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'purple' }}></article>
            </section>

            <section className="title-input">
                <label htmlFor="title">Board title<span>*</span></label>
                <input value={title} onChange={handleChange} type="text" id="title" name="title" />
                {!title && <p>👋 Board title is required</p>}
            </section>

            <button onClick={onAddBoard} className="btn-create">Create</button>
        </section>
    )
}