import { useState } from "react"
import { removeBoard } from '../store/actions/board.actions'
import { removeBoardFromFavorites } from '../store/actions/user.actions'
import { useNavigate } from "react-router"
import { ChangeColorBackground } from './ChangeColorBackground'
import { ChangePhotoBackground } from "./ChangePhotoBackground"
import { getFormattedTime } from "../services/util.service"

import closeIcon from '../assets/imgs/Icons/close.svg'
import expandIcon from '../assets/imgs/Icons/expand.svg'
import collapseIcon from '../assets/imgs/Icons/collapse.svg'
import arrowDownIcon from '../assets/imgs/Icons/arrow-down.svg'
import activityIcon from '../assets/imgs/TaskDetails-icons/activity.svg'
import trashIcon from '../assets/imgs/TaskDetails-icons/trash.svg'


export function RightNavBar({ onClose, isRightNavBarOpen, toggleAllGroupsCollapse, board }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCollapseOpen, setIsCollapseOpen] = useState(false)
    const [field, setField] = useState('Menu')

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
            return newState
        })
    }

    function getActivityByTitle(activity) {
        if (activity.title === 'create board') {
            return 'created this board'
        }
        return activity.title.charAt(0).toLowerCase() + activity.title.slice(1) //Lowercase first letter
    }

    return (
        <section className={`right-nav-bar-container ${!isRightNavBarOpen ? 'is-close' : ''}`}>
            <section className="right-nav-bar-header">
                <div>
                    <span>{field}</span>
                </div>
                <div className={`to-menu-btn-wrapper${field !== 'Menu' ? '' : ' back-to'}`} onClick={() => setField('Menu')}>
                    <img src={arrowDownIcon} alt="Back to Menu" />
                </div>

                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </div>
                <hr className="header-sep" />
            </section>
            <section className="right-nav-bar-body">
                {field === 'Menu' && (
                    <>
                        <div className="activity-container" onClick={() => setField('Activity')}>
                            <div className="activity-wrapper">
                                <img src={activityIcon} alt="" />
                                <span>Activity</span>
                            </div>
                        </div>

                        <div className="change-background-container" onClick={() => setField('Change background')}>
                            <div className="change-background-wrapper" >
                                <div className="bgc-img" style={board.style}></div>
                                <span>Change background</span>
                            </div>
                        </div>

                        <div className="collapse-all-container" onClick={onCollapseToggle}>
                            <div className="collapse-all-wrapper">
                                <img
                                    src={isCollapseOpen ? expandIcon : collapseIcon}
                                    alt={isCollapseOpen ? "Expand" : "Collapse"}
                                />
                                <span>{isCollapseOpen ? 'Expand all' : 'Collapse all'}</span>
                            </div>
                        </div>

                        <div className="delete-board-container" onClick={() => setIsDeleteModalOpen(true)}>
                            <div className="delete-board-wrapper">
                                <img src={trashIcon} alt="" />
                                <span> Delete board</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Acticity body */}
                {field === 'Activity' && (
                    <div className="activity-log">
                        {board.activities && board.activities.length > 0 ? (
                            board.activities.map((activity, idx, activities) => {
                                const currentActivity = activities[activities.length - idx - 1];
                                return (
                                    <div key={currentActivity.id} className="activity-item-container">
                                        <img className="user-img" src={currentActivity.byMember.imgUrl} />
                                        <div className="activity-info">
                                            <div className="activity-item">{currentActivity.byMember.fullname} {getActivityByTitle(currentActivity)}</div>
                                            <div className="activity-time">{getFormattedTime(currentActivity.createdAt)}</div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No activities to show</p>
                        )}
                    </div>
                )}

                {/* Change background body*/}
                {field === 'Change background' && (
                    <div className="background-options" >
                        <div className="imgs-option" onClick={() => setField('Photos by Unsplash')}>
                            <img src="../assets/imgs/photosoption.jpg" alt="" />
                            <span>Photos</span>
                        </div>

                        <div className="colors-option" onClick={() => setField('Colors')}>
                            <img src="../assets/imgs/colorsoption.png" alt="" />
                            <span>Colors</span>
                        </div>
                    </div>
                )}

                {field === 'Photos by Unsplash' && (
                    <ChangePhotoBackground
                        board={board}
                    />
                )}

                {field === 'Colors' && (
                    <ChangeColorBackground
                        board={board}
                    />
                )}

            </section>

            {isDeleteModalOpen && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <div className="close-btn-wrapper" onClick={() => setIsDeleteModalOpen(false)}>
                            <img src={closeIcon} alt="Close" />
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