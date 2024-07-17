import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return <article className='board-preview'>
            <Link to={`/board/${board._id}`}><img className='board-preview-img' src={board.style.backgroundImage} alt="" /></Link>
    </article>
}