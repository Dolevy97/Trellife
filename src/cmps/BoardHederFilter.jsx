import { useState, useEffect } from 'react'
import closeIcon from '../assets/imgs/Icons/close.svg'
import { isLightColor } from '../services/util.service'

export function BoardHederFilter({ onClose, filterBy, setFilterBy, board }) {
    const [filterToEdit, setFilterToEdit] = useState(filterBy)

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setFilterBy(filterToEdit)
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [filterToEdit, setFilterBy])

    function handleChange(ev) {
        const { name, value, type, checked } = ev.target

        if (type === 'checkbox') {
            const updatedArray = checked
                ? [...(filterToEdit[name] || []), value]
                : (filterToEdit[name] || []).filter(id => id !== value)

            setFilterToEdit(prevFilter => ({
                ...prevFilter,
                [name]: updatedArray
            }))
        } else {
            setFilterToEdit(prevFilter => ({
                ...prevFilter,
                [name]: value
            }))
        }
    }

    return (
        <section className="BoardHederFilter" >
            <header>
                <span>Filter</span>
                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </div>
            </header>
            <div className="board-filter-body">
                <div className="filter-info">
                    <div className="search-container">
                        <span>Keywords</span>
                        <input
                            onChange={handleChange}
                            value={filterToEdit.title || ''}
                            type="text"
                            name='title'
                            id='search'
                            placeholder='Enter a keywords'
                        />
                        <span className='input-details'>Search cards, members, labels, and more.</span>
                    </div>
                </div>
                <div className="members-container">
                    <span>Members</span>
                    {board.members.map(member => (
                        <label key={member._id}>
                            <input
                                type="checkbox"
                                name="memberIds"
                                value={member._id}
                                checked={(filterToEdit.memberIds || []).includes(member._id)}
                                onChange={handleChange}
                            />
                            <img
                                src={member.imgUrl}
                                alt={member.fullname}
                                className="member-thumbnail"
                                title={member.fullname}
                            />
                            {member.fullname}
                        </label>
                    ))}
                </div>
                <div className="labels-container">
                    <span>Labels</span>
                    {board.labels.map(label => (
                        <label key={label.id}>
                            <input
                                type="checkbox"
                                name="labelIds"
                                value={label.id}
                                checked={(filterToEdit.labelIds || []).includes(label.id)}
                                onChange={handleChange}
                            />
                            <div
                                className="label-color"
                                style={{ backgroundColor: label.color, color: isLightColor(label.color) ? '#1d2125' : 'currentColor' }}
                                title={label.title} >
                                <span>{label.title}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </section>
    )
}