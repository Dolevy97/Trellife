import React, { useState, useRef, useEffect } from 'react'

const options = [
    { label: 'Most recently active', value: 'most-recent-active' },
    { label: 'Least recently active', value: 'least-recent-active' },
    { label: 'Alphabetically A-Z', value: 'alphabet-a-z' },
    { label: 'Alphabetically Z-A', value: 'alphabet-z-a' }
]

export function CustomSelect({ onSortBy }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }

    function handleOptionClick(option) {
        setSelectedOption(option)
        setIsOpen(false)
        onSortBy(option.value)
    }

    return (
        <div className="custom-select" ref={dropdownRef}>
            <div className="select-header" onClick={toggleDropdown}>
                <span className="selected-option">{selectedOption.label}</span>
                <svg className='arrow' width="24" height="24" viewBox="0 0 24 24" role="presentation">
                    <path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
            </div>
            {isOpen && (
                <ul className="options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={option === selectedOption ? 'selected' : ''}
                            onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}