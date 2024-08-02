import { useEffect, useState } from "react"
import { showErrorMsg } from "../services/event-bus.service"

import openAILogo from '../assets/imgs/Icons/OpenAI_Logo.svg'
import closeIcon from '../assets/imgs/Icons/close.svg'


export function CreateAiBoardModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false)
            setTimeout(() => setIsActive(true), 10)
        } else {
            if (isActive) {
                setIsClosing(true)
                setTimeout(() => {
                    setIsActive(false)
                    setIsClosing(false)
                }, 500) 
            }
        }
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        if (title.length === 0) return showErrorMsg('Please enter a title for your project.')
        onSubmit(title)
        handleClose()
        setTitle('')
    }

    function handleClose() {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            setTitle('')
        }, 500) 
    }

    if (!isOpen && !isClosing) return null

    return (
        <div className={`modal-overlay ${isActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className={`modal ${isActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
                <div className="ai-title"> 
                    <img className="icon" src={openAILogo} alt="" />
                    <h2>Create AI Board</h2>
                    <div className="close-btn-wrapper" onClick={handleClose}>
                    <img src={closeIcon} alt="Close" />
                </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="project-title">Name the project you'd like to create</label>
                    <input
                        id="project-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}