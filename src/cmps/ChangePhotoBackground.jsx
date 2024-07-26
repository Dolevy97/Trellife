


import { updateBoardBgc } from "../store/actions/board.actions";


export function ChangePhotoBackground({board }) {


    async function onUpdateBgc(img) {
        try {
            await updateBoardBgc(board, `url(${img})`)
        } catch (err) {
            console.log('Cannot update img board', err)
        }
    }

    return (
        <section className="change-photo-background">


            <div className="photos-bgc-container">
                {/* {imgs.map((img, index) => (
                    <img
                        key={index}
                        onClick={() => onUpdateBgc(img)}
                        src={img}
                    ></img>
                ))} */}
                <span>test</span>
            </div>


        </section>
    )
}