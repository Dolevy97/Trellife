import { Link } from 'react-router-dom';
import { updateBoard } from '../store/actions/board.actions';

export function BoardPreview({ board }) {

    function onClickStar(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        const boardToSave = { ...board, isStarred: !board.isStarred }
        updateBoard(boardToSave)
    }
    return (
        <article className='board-preview'>
            <Link to={`/board/${board._id}`}>
                <div className='board-preview-wrapper' title={board.title}>
                    <div
                        style={{ background: board.style.background, backgroundPosition: '50%' }}
                        className='board-preview-img'>
                        <img onClick={onClickStar}
                            title={board.isStarred ? 'Click to unstar this board. It will be removed from your starred list.'
                                : 'Click to star this board. It will be added to your starred list.'}

                            className={`board-preview-star ${board.isStarred ? 'starred' : ''}`}

                            src={board.isStarred ? "../src/assets/imgs/Icons/fullstar.svg"
                                : '../../../src/assets/imgs/Icons/star.svg'}

                            alt="star icon" />

                        <img onClick={onClickStar}
                            className='empty-starred'
                            src="../../../src/assets/imgs/Icons/star.svg"
                            alt="star"
                            title='Click to unstar this board. It will be removed from your starred list.' />
                    </div>
                    <div className='overlay'><h1 className="title">{board.title}</h1></div>
                </div>
            </Link>
        </article>
    );
}
