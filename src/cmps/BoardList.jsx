import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onRemoveBoard, onUpdateBoard }) {


    return <section>
        <ul className="list">
            {boards.map(board =>
                <li key={board._id}>
                    <BoardPreview board={board} />
                    <div className="actions">
                        <button onClick={() => onUpdateBoard(board)}>Edit</button>
                        <button onClick={() => onRemoveBoard(board._id)}>x</button>
                    </div>
                </li>)
            }
        </ul>
    </section>
}