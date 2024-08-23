import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/actions/user.actions';

import star from '../assets/imgs/Icons/star.svg';
import fullStar from '../assets/imgs/Icons/fullstar.svg';

export const BoardPreview = React.memo(function BoardPreview({ board }) {
    const dispatch = useDispatch();
    const user = useSelector(storeState => storeState.userModule.user);
    const boardPreviewRef = useRef(null);

    useEffect(() => {
        if (boardPreviewRef.current) {
            boardPreviewRef.current.style.backgroundSize = 'cover';
            boardPreviewRef.current.style.backgroundPosition = '50% 50%';
        }
    }, []);

    const onClickStar = useCallback(async (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const updatedUser = { ...user };
        if (!updatedUser.favorites.includes(board._id)) {
            updatedUser.favorites.push(board._id);
        } else {
            updatedUser.favorites = updatedUser.favorites.filter(id => id !== board._id);
        }
        dispatch(updateUser(updatedUser));
    }, [user, board._id, dispatch]);

    const isFavorite = useMemo(() => user && user.favorites.includes(board._id), [user, board._id]);

    const starTitle = useMemo(() => 
        isFavorite
            ? 'Click to unstar this board. It will be removed from your starred list.'
            : 'Click to star this board. It will be added to your starred list.',
        [isFavorite]
    );

    if (!user) return null;

    return (
        <article className='board-preview'>
            <Link to={`/board/${board._id}`}>
                <div className='board-preview-wrapper' title={board.title}>
                    <div
                        ref={boardPreviewRef}
                        style={{ background: board.style.background }}
                        className='board-preview-img'>
                        <img 
                            onClick={onClickStar}
                            title={starTitle}
                            className={`board-preview-star ${isFavorite ? 'starred' : ''}`}
                            src={isFavorite ? fullStar : star}
                            alt="star icon" 
                        />
                        <img 
                            onClick={onClickStar}
                            className='empty-starred'
                            src={star}
                            alt="star"
                            title='Click to unstar this board. It will be removed from your starred list.' 
                        />
                    </div>
                    <div className='overlay'><h1 className="title">{board.title}</h1></div>
                </div>
            </Link>
        </article>
    );
});