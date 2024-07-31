import { useState } from "react"
import { showErrorMsg } from "../services/event-bus.service"


export function CreateAiBoardModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (title.length === 0) return showErrorMsg('Please enter a title for your project.')
        onSubmit(title)
        onClose()
        setTitle('')
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Create AI Board</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="project-title">Name the project you'd like to create:</label>
                    <input
                        id="project-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}