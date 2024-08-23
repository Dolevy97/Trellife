import { useState, useEffect, useRef } from 'react'
import { CustomSelect } from './CustomSelect'
import { debounce } from '../services/util.service'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function Filter({ filterBy, onSetFilter, onSortBy, onSetSort }) {

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'activity', dir: -1 })

    const debouncedSetFilter = useRef(debounce(filter => onSetFilter(filter), 300))

    useEffectUpdate(() => {
        debouncedSetFilter.current(filterToEdit)
    }, [filterToEdit])

    useEffectUpdate(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

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

    function onSortBy(sortOption) {
        switch (sortOption) {
            case 'most-recent-active':
                setSortByToEdit({ field: 'activity', dir: -1 })
                break;
            case 'least-recent-active':
                setSortByToEdit({ field: 'activity', dir: 1 })
                break;
            case 'alphabet-a-z':
                setSortByToEdit({ field: 'alphabet', dir: 1 })
                break;
            case 'alphabet-z-a':
                setSortByToEdit({ field: 'alphabet', dir: -1 })
                break;
            default:
        }
    }

    const { title } = filterToEdit

    return (
        <section className="board-filter">
            <article className="sort-container">
                <label className='short-label' htmlFor="sort">Sort by</label>
                <CustomSelect
                    onSortBy={onSortBy}
                />
            </article>

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