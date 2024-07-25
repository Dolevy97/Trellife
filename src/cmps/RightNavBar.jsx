import { useState } from "react"
import {removeBoard } from '../store/actions/board.actions'
import { useNavigate } from "react-router";


export function RightNavBar({ onClose, isRightNavBarOpen, toggleAllGroupsCollapse, board}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const navigate = useNavigate()

    async function onRemoveBoard() {
        console.log( board._id)
        try {
            await removeBoard(board._id)
            console.log('Board removed successfully')
            navigate('/board')
        } catch (err) {
            console.error('Cannot remove board', err)
        }
    }

    function handleDeleteConfirm() {
        onRemoveBoard()
        setIsDeleteModalOpen(false)
        onClose()
    }

    return (
        <section className={`right-nav-bar-container ${!isRightNavBarOpen ? 'is-close' : ''}`}>
            <section className="right-nav-bar-header">
                <div>
                    <span>Menu</span>
                </div>
                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src="../../../src/assets/imgs/Icons/close.svg" alt="Close" />
                </div>
                <hr className="header-sep" />
            </section>
            <section className="right-nav-bar-body">

                <div className="activity-container">
                    <div className="activity-wrapper">
                        <img src="../../../src\assets\imgs\TaskDetails-icons\activity.svg" alt="" />
                        <span>Activity</span>
                    </div>
                </div>

                <div className="change-background-container">
                    <div className="change-background-wrapper" >
                        <img src="../../../src\assets\imgs\TaskDetails-icons\card.svg" alt="" />
                        <span>Change background</span>
                    </div>
                </div>

                <div className="collapse-all-container" onClick={toggleAllGroupsCollapse}>
                    <div className="collapse-all-wrapper">
                        <img src="../../../src\assets\imgs\Icons\collapse.svg" alt="" />
                        <span>Collapse all</span>
                    </div>
                </div>

                <div className="delete-board-container" onClick={() => setIsDeleteModalOpen(true)}>
                    <div className="delete-board-wrapper">
                        <img src="../../../src\assets\imgs\TaskDetails-icons\trash.svg" alt="" />
                        <span> Delete board</span>
                    </div>
                </div>
            </section>
            {isDeleteModalOpen && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <h2>Are you sure?</h2>
                        <p>This action will permanently delete the board.</p>
                        <div className="delete-modal-buttons">
                            <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                            <button onClick={handleDeleteConfirm} className="delete-confirm-btn">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </section>

    )
}