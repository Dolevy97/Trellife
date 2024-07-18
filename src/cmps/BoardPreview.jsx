import { Link } from 'react-router-dom';

export function BoardPreview({ board }) {
    return (
        <article className='board-preview'>
            <Link to={`/board/${board._id}`}>
                <div className='board-preview-wrapper' title={board.title}>
                    <div
                        style={{ background: board.style.background, backgroundPosition: '50%' }}
                        className='board-preview-img'></div>
                    <div className='overlay'><h1 className="title">{board.title}</h1></div>
                </div>
            </Link>
        </article>
    );
}
