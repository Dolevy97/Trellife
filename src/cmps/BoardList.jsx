import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onRemoveBoard, onUpdateBoard }) {


    return <section>
        <section className="board-list">
            {boards.map(board =>
                <>
                    <BoardPreview board={board} />
                    <div className="actions">
                        {/* <button onClick={() => onUpdateBoard(board)}>Edit</button>
                        <button onClick={() => onRemoveBoard(board._id)}>x</button> */}
                    </div></>)}

        </section>
    </section>
}