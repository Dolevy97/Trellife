import { useState, useEffect } from 'react'

export function Filter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function onClearSearch() {
        setFilterToEdit({ ...filterToEdit, title: '' })
    }

    const { title } = filterToEdit

    return (
        <section className="board-filter">
            <article className="sort-container">
                <label className='short-label' htmlFor="sort">Sort by</label>
                <select name="sortBy" id="">
                    <option value="most-recent-active">Most recently active</option>
                    <option value="least-recent-active">Least recently active</option>
                    <option value="alphabet-a-z">Alphabetically A-Z</option>
                    <option value="alphabet-z-a">Alphabetically Z-A</option>
                </select>
            </article>
            {/* <label className='short-label' htmlFor="filter">Filter by</label> */}

            <article className="search-filter-container">
                <label className='long-label' htmlFor="search">Search</label>
                <div className='input-container'>
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input onChange={handleChange} value={title} type="text" name='title' id='search' placeholder='Search boards' />
                    <button onClick={onClearSearch} className='btn-clear-search'><span className="material-symbols-outlined">x</span></button>
                </div>
            </article>
        </section>
    )
}