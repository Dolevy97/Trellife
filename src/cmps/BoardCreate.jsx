import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board"
import { addBoard } from "../store/actions/board.actions"
import { useNavigate } from "react-router"
import { getBackgroundImages } from "../services/util.service"
import { useSelector } from "react-redux"

import addPreview from '../assets/imgs/add-preview.svg'

export function BoardCreate({ setIsAdding, createButtonPosition }) {
    const [background, setBackground] = useState(`#0079bf`)
    const [backgroundImage, setBackgroundImage] = useState("")
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())
    const [backgroundImages, setBackgroundImages] = useState([])
    const [isBoardCreateOpen, setIsBoardCreateOpen] = useState(false)
    const [isImage, setIsImage] = useState(false)

    const boardCreateRef = useRef(null)
    const previewRef = useRef(null)

    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()

    useEffect(() => {
        getBackgroundImages().then(images => setBackgroundImages(images.slice(0, 4)))
    }, [])

    useEffect(() => {
        if (previewRef.current) {
            previewRef.current.style.backgroundSize = 'cover'
        }
    }, [background, backgroundImage])

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
    }, [isBoardCreateOpen])

    function handleClickOutside(event) {
        if (boardCreateRef.current && !boardCreateRef.current.contains(event.target)) {
            if (setIsAdding) setIsAdding(false)
            else {
                setIsBoardCreateOpen(false)
                navigate(-1)
            }
        }
    }

    function onChooseBGColor(ev, fullSizeUrl) {
        if (ev.target.className === 'bg-img' || ev.target.parentElement.className === 'bg-img') {
            setBackgroundImage(fullSizeUrl)
            setIsImage(true)
        } else {
            setBackground(ev.target.style.background)
            setBackgroundImage("")
            setIsImage(false)
        }
    }

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value = ev.target.value
        setBoardToAdd({ ...boardToAdd, [field]: value })
    }

    async function onAddBoard() {
        const newBoard = {
            ...boardToAdd,
            style: { background: isImage ? `url(${backgroundImage})` : background },
            createdBy: user
        }
        if (!newBoard.title) return
        const addedBoard = await addBoard(newBoard)
        if (setIsAdding) setIsAdding(false)
        navigate(`/board/${addedBoard._id}`)
    }

    const { title } = boardToAdd

    if (!backgroundImages) return null

    return (
        <section
            className={`board-create ${setIsAdding && 'from-header'}`}
            ref={boardCreateRef}
            style={{ top: createButtonPosition?.top + 10, left: createButtonPosition?.left - 140 }}
        >
            <article className="create-header">
                <h1>Create board</h1>
            </article>
            <div className="preview-container">
                <div
                    ref={previewRef}
                    className="preview"
                    style={{ backgroundColor: isImage ? 'transparent' : background, backgroundImage: isImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover' }}>
                    <img src={addPreview} alt="" />
                </div>
            </div>
            <label htmlFor="bg-picker" className="bg-picker-label">Background</label>
            <section className="bg-picker" id="bg-picker">
                {backgroundImages.map(img => (
                    <article
                        key={img.id}
                        onClick={(ev) => onChooseBGColor(ev, img.url)}
                        className="bg-img">
                        <img src={img.smallUrl} alt="" />
                    </article>
                ))}
                <article onClick={onChooseBGColor} className="bg" style={{ background: '#0079bf' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ background: '#d29034' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ background: '#519839' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ background: 'skyblue' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ background: '#4bbf6b' }}></article>
                <article onClick={onChooseBGColor} className="bg" style={{ background: 'purple' }}></article>
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
