import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { updateGroup } from '../store/actions/group.actions'

export function GroupAction({ onColorChange, isOpen, onClose }) {
    const colors = [
        '#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46',
        '#c377e0', '#0079bf', '#00c2e0', '#51e898',
        '#ff78cb', '#344563', '#b3bac5'
    ]

    if (!isOpen) return null

    return (
        <div className="color-picker-overlay" onClick={onClose}>
            <div className="color-picker-content" onClick={(e) => e.stopPropagation()}>
                <h3>Colors</h3>
                <div className="color-grid">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                                onColorChange(color)
                                onClose()
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
