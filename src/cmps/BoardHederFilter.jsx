import { useState, useEffect } from 'react'

export function BoardHederFilter({ onClose, filterBy, setFilterBy, board }) {
    const [filterToEdit, setFilterToEdit] = useState(filterBy)

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setFilterBy(filterToEdit)
        }, 300) 

        return () => clearTimeout(debounceTimer)
    }, [filterToEdit, setFilterBy])

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterToEdit(prevFilter => ({
            ...prevFilter,
            [name]: value
        }))
    }

    return (
        <section className="BoardHederFilter">
            <header>
                <span>Filter</span>
                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src="../../../src/assets/imgs/Icons/close.svg" alt="Close" />
                </div>
            </header>
            <div className="filter-info">
                <div className="search-container">
                    <span>Keywords</span>
                    <input
                        onChange={handleChange}
                        value={filterToEdit.title || ''}
                        type="text"
                        name='title'
                        id='search'
                        placeholder='Search cards, members, labels, and more.'
                    />
                </div>
                <span>Search cards, members, labels, and more.</span>
            </div>
            <div className="members-container">
                <span>members</span>
           
            </div>
            <div className="labels-container">
                <span>labels</span>
              
            </div>
        </section>
    )
}