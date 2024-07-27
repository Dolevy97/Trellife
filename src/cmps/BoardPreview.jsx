import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUser } from '../store/actions/user.actions';
import { useEffect, useRef } from 'react';

import star from '../assets/imgs/Icons/star.svg'
import fullStar from '../assets/imgs/Icons/fullstar.svg'

export function BoardPreview({ board }) {
    const user = useSelector(storeState => storeState.userModule.user)

    const boardPreviewRef = useRef(null)

    useEffect(() => {
        if (boardPreviewRef.current) {
            boardPreviewRef.current.style.backgroundSize = 'cover'
            boardPreviewRef.current.style.backgroundPosition = '50% 50%'

        }
    }, [board])

    async function onClickStar(ev, boardId) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!user.favorites.includes(boardId)) user.favorites.push(boardId)
        else {
            user.favorites = user.favorites.filter(id => id !== boardId)
        }
        await updateUser(user)
    }

    if (!user) return null

    return (
        <article className='board-preview'>
            <Link to={`/board/${board._id}`}>
                <div className='board-preview-wrapper' title={board.title}>
                    <div
                        ref={boardPreviewRef}
                        style={{ background: board.style.background }}
                        className='board-preview-img'>
                        <img onClick={(ev) => onClickStar(ev, board._id)}
                            title={user && user.favorites.includes(board._id) ? 'Click to unstar this board. It will be removed from your starred list.'
                                : 'Click to star this board. It will be added to your starred list.'}

                            className={`board-preview-star ${user && user.favorites.includes(board._id) ? 'starred' : ''}`}

                            src={user && user.favorites.includes(board._id) ? fullStar : star}

                            alt="star icon" />

                        <img onClick={(ev) => onClickStar(ev, board._id)}
                            className='empty-starred'
                            src={star}
                            alt="star"
                            title='Click to unstar this board. It will be removed from your starred list.' />
                    </div>
                    <div className='overlay'><h1 className="title">{board.title}</h1></div>
                </div>
            </Link>
        </article>
    )
}