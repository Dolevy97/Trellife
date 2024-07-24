import { Link, Outlet } from 'react-router-dom'
import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {


    return <section>
        <section className="board-list">
            <div className="board-preview-container">
                <article className='board-preview'>
                    <div className='board-preview-wrapper'>
                        <div className='board-preview-img'>
                            <Outlet />
                            <Link to='/board/add' >
                                <article className='create-new-board'>
                                    <p>Create new board</p>
                                </article>
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
            {boards.map(board =>
                <div className='board-preview-container' key={board._id}>
                    <BoardPreview board={board} />
                </div>
            )}

        </section>

    </section >
}