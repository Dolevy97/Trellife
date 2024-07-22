import { useState, useEffect, useRef } from 'react'
import { updateBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { updateGroup } from '../store/actions/group.actions'

export function GroupAction({ onColorChange }) {
    const colors = [
        '#04120d', '#344563', '#0055cc', 
        '#7f5f01', '#a54800', '#ae2e24', '#206a83', '#5e4db2', '#216e4e'
    ]



    return (
        <div className="color-grid">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorChange(color)}
                />
            ))}
        </div>
    );
}
