import { useState } from "react"
import { removeBoard } from '../store/actions/board.actions'
import { removeBoardFromFavorites } from '../store/actions/user.actions'
import { useNavigate } from "react-router";


export function RightNavBar({ onClose, isRightNavBarOpen, toggleAllGroupsCollapse, board }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCollapseOpen, setIsCollapseOpen] = useState(false)

    const navigate = useNavigate()

    async function onRemoveBoard() {
        try {
            await removeBoard(board._id)
            await removeBoardFromFavorites(board._id)
            console.log('Board removed successfully')
            navigate('/board')
            //add msg
        } catch (err) {
            console.error('Cannot remove board', err)
        }
    }

    function handleDeleteConfirm() {
        onRemoveBoard()
        setIsDeleteModalOpen(false)
        onClose()
    }

    function onCollapseToggle() {
        setIsCollapseOpen(prevState => {
            const newState = !prevState
            toggleAllGroupsCollapse(newState)
            return newState;
        })
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
                        <div className="bgc-img" style={board.style}></div>
                        <span>Change background</span>
                    </div>
                </div>
                <div className="collapse-all-container" onClick={onCollapseToggle}>
                    <div className="collapse-all-wrapper">
                        <img
                            src={`../../../src/assets/imgs/Icons/${isCollapseOpen ? 'expand' : 'collapse'}.svg`}
                            alt={isCollapseOpen ? "Expand" : "Collapse"}
                        />
                        <span>{isCollapseOpen ? 'Expand all' : 'Collapse all'}</span>
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
                        <div className="close-btn-wrapper" onClick={() => setIsDeleteModalOpen(false)}>
                            <img src="../../../src/assets/imgs/Icons/close.svg" alt="Close" />
                        </div>
                        <p>Delete board?</p>
                        <p>This action will permanently delete the board</p>
                        <button onClick={handleDeleteConfirm} className="delete-confirm-btn">Delete</button>
                    </div>
                </div>
            )}
        </section>

    )
}