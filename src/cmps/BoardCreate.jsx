import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board"
import { getRandomMember } from "../services/board/board-demo-data.service"
import { addBoard } from "../store/actions/board.actions"
import { useNavigate } from "react-router"

export function BoardCreate({ setIsAdding }) {
    const img = 'data:image/jpeg;base64,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'
    const [background, setBackground] = useState(`url(${img})`)
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())

    const [isBoardCreateOpen, setIsBoardCreateOpen] = useState(false);
    const boardCreateRef = useRef(null);

    const navigate = useNavigate()


    function handleClickOutside(event) {
        if (boardCreateRef.current && !boardCreateRef.current.contains(event.target)) {
            setIsBoardCreateOpen(false)
            if (setIsAdding) setIsAdding(false)
            navigate('/board')
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
        if (!newBoard.title) {

            return
        }
        await addBoard(newBoard)
        if (setIsAdding) setIsAdding(false)
        else navigate(-1)
    }

    const { title } = boardToAdd

    return (
        <section className={`board-create ${setIsAdding && 'from-header'}`} ref={boardCreateRef}>
            <article className="create-header">
                <h1>Create board</h1>
            </article>
            <div className="preview-container">
                <div className="preview" style={{ background: background }}>
                    <img src="../src\assets\styles\imgs\add-preview.svg" alt="" />
                </div>
            </div>
            <label htmlFor="bg-picker" className="bg-picker-label">Background</label>
            <section className="bg-picker" id="bg-picker">
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightpink' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightblue' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightgreen' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightgoldenrodyellow' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightcyan' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ backgroundColor: 'lightcoral' }}></article>
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