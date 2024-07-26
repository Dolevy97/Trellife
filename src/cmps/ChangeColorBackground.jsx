import { useNavigate } from "react-router";
import { updateBoardBgc } from "../store/actions/board.actions";


export function ChangeColorBackground({ board}) {

    const navigate = useNavigate()

    const palette = [
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384735/d106776cb297f000b1f4_aixvzg.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384777/8ab3b35f3a786bb6cdac_f6yj4u.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389848/b75536d1afb40980ca57_ftydw5.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389863/941e9fef7b1b1129b904_nm94td.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389871/1cbae06b1a428ad6234a_rhmbqu.svg'
    ]

    async function onUpdateBgc(bgc) {
        try {
            // await updateBoardBgc(board, `url(${bgc})`)
            const newboard = await updateBoardBgc(board, `url(${bgc})`)
            console.log(newboard)
        } catch (err) {
            console.log('Cannot update bgc board', err)
        }
    }

    return (
        <section className="change-color-background">
                {palette.map((colorOption, index) => (
                    <button
                        key={index}
                        className="color-button"
                        onClick={() => onUpdateBgc(colorOption)}
                        style={{ backgroundImage: `url(${colorOption})` }}
                    ></button>
                ))}
            
        </section>
    )
}