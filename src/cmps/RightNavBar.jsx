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
import loadingAnimation from '../assets/imgs/TaskDetails-icons/loading animation.svg'

import photosOptions from '../assets/imgs/photosoption.jpg'
import colorsOptions from '../assets/imgs/colorsoption.png'
import { useSelector } from "react-redux"

export function RightNavBar({ onClose, isRightNavBarOpen, toggleAllGroupsCollapse, board }) {
    const users = useSelector(store => store.userModule.users)

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

    async function onCollapseToggle() {
        const newState = !isCollapseOpen
        setIsCollapseOpen(newState)
        await toggleAllGroupsCollapse(newState)
    }

    function getActivityByTitle(activity, board, users) {
        const shortTitle = activity.title.split(' ').slice(0, 2).join(' ')

        function replaceUserIds(title) {
            if (!Array.isArray(users)) {
                return title
            }
            return users.reduce((acc, user) => {
                if (user && user._id && acc.includes(user._id)) {
                    return acc.replace(user._id, `<span class="user-mention">${user.fullname}</span>`)
                }
                return acc
            }, title)
        }

        function formatTimestamp(timestamp) {
            const date = new Date(Number(timestamp))
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const month = months[date.getMonth()]
            const day = date.getDate()
            let hours = date.getHours()
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const ampm = hours >= 12 ? 'PM' : 'AM'
            hours = hours % 12
            hours = hours ? hours : 12 // the hour '0' should be '12'

            return `${month} ${day} ${hours}:${minutes} ${ampm}`
        }

        function extractAndFormatTimestamp(title) {
            const timestampRegex = /\b\d{13}\b/
            const match = title.match(timestampRegex)
            if (match) {
                const timestamp = match[0]
                const formattedTime = formatTimestamp(timestamp)
                return title.replace(timestamp, formattedTime)
            }
            return title
        }

        let formattedTitle = ''

        if (shortTitle === 'create board') {
            formattedTitle = 'created this board'
        } else if (activity.task && activity.title.includes(activity.task.id)) {
            const href = `${board._id}/${activity.group.id}/${activity.task.id}`
            const linkText = `<a href="${href}">${activity.task.title}</a>`
            formattedTitle = activity.title.replace(activity.task.id, linkText)
        } else if (shortTitle === 'add comment' && activity.task) {
            const href = `${board._id}/${activity.group.id}/${activity.task.id}`
            const linkText = `<a href="${href}">${activity.task.title}</a>`
            const newTitle = `added a comment to ${activity.task.id}`
            formattedTitle = newTitle.replace(activity.task.id, linkText)
        } else {
            // For all other cases, keep the original title
            formattedTitle = activity.title
        }

        // Replace timestamp in the title
        formattedTitle = extractAndFormatTimestamp(formattedTitle)

        // Replace user IDs
        formattedTitle = replaceUserIds(formattedTitle)

        return formattedTitle
    }

    if (!users) return <div className='isloading-container'> <img className='isLoading' src={loadingAnimation} /> </div>

    return (
        <section className={`right-nav-bar-container ${!isRightNavBarOpen ? 'is-close' : ''}`}>
            <section className="right-nav-bar-header">
                <span className="menu-title">{field}</span>
                <div className={`to-menu-btn-wrapper${field !== 'Menu' ? '' : ' back-to'}`} onClick={() => setField('Menu')}>
                    <img src={arrowDownIcon} alt="Back to Menu" />
                </div>

                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </div>
            </section>
            <hr className="header-sep" />
            <section className="right-nav-bar-body">
                {field === 'Menu' && (
                    <>
                        <div className="activity-container" >
                            <div className="activity-wrapper" onClick={() => setField('Activity')}>
                                <img src={activityIcon} alt="" />
                                <span>Activity</span>
                            </div>
                        </div>

                        <div className="change-background-container" >
                            <div className="change-background-wrapper" onClick={() => setField('Change background')}>
                                <div className="bgc-img" style={board.style}></div>
                                <span>Change background</span>
                            </div>
                        </div>

                        <div className="collapse-all-container" >
                            <div className="collapse-all-wrapper" onClick={onCollapseToggle}>
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
                                            <div className="activity-item">
                                                <span className="user-mention">{currentActivity.byMember.fullname}</span>{' '}
                                                <span dangerouslySetInnerHTML={{ __html: getActivityByTitle(currentActivity) }} />
                                            </div>
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
                            <img src={photosOptions} alt="" />
                            <span>Photos</span>
                        </div>

                        <div className="colors-option" onClick={() => setField('Colors')}>
                            <img src={colorsOptions} alt="" />
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