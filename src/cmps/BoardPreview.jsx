import { Link } from 'react-router-dom';

export function BoardPreview({ board }) {
    console.log(board)
    return (
        <>
            <article className='board-preview' key={board._id}>
                <Link to={`/board/${board._id}`}>
                    <div className='board-preview-wrapper'>
                        <img className='board-preview-img' src={board.style.backgroundImage} alt="" />
                        <div className='overlay'></div>
                    </div>
                </Link>
                <h1 className="title">{board.title}</h1>
                <div className="btn-container"><button className="btn-add-to-collection">+</button></div>
            </article>
        </>
    )
}
