import { useState, useEffect, useRef } from 'react'
import closeIcon from '../assets/imgs/Icons/close.svg'
import { isLightColor } from '../services/util.service'

export function BoardHeaderFilter({ onClose, filterBy, setFilterBy, board }) {

    const [filterToEdit, setFilterToEdit] = useState(filterBy)
    const filterRef = useRef(null)

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setFilterBy(filterToEdit)
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [filterToEdit, setFilterBy])

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                onClose()
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

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

    const filteredMembers = board.members.filter(member =>
        !filterToEdit.title || member.fullname.toLowerCase().includes(filterToEdit.title.toLowerCase())
    )

    const filteredLabels = board.labels.filter(label =>
        !filterToEdit.title || label.title.toLowerCase().includes(filterToEdit.title.toLowerCase())
    )

    return (
        <section className="board-header-filter" ref={filterRef}>
            <header>
                <span>Filter</span>
                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </div>
            </header>
            <div className="board-filter-body">
                <div className="filter-info">
                    <div className="search-container">
                        <span>Keyword</span>
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
                {filteredMembers.length ?
                    <div className="members-container">
                        <span>Members</span>
                        {filteredMembers.map(member => (
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
                    :
                    null}
                {filteredLabels.length ?
                    <div className="labels-container">
                        <span>Labels</span>
                        {filteredLabels.map(label => (
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
                    :
                    null
                }
                {!filteredLabels.length && !filteredMembers.length &&
                    <div className="nothing-found">
                        <img src="https://trello.com/assets/d2a0b151afa14cbf5147.svg" alt="" />
                        <p>Nothing found</p>
                        <p>Couldn't find any card, member or label match.</p>
                        <p>Try another search.</p>
                    </div>
                }
            </div>
        </section>
    )
}