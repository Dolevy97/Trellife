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


    return (
        <section className="board-filter">
            <label className='short-label' htmlFor="sort">Sort by</label>

            <label className='short-label' htmlFor="filter">Filter by</label>

            <article className="search-filter-container">
                <label className='long-label' htmlFor="search">Search</label>
                <input type="text" name='title' id='search' />
            </article>
        </section>
    )
}