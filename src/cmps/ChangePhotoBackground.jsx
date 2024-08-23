import { useEffect, useState } from "react";
import { getBackgroundImages } from "../services/util.service";
import { updateBoardBgc } from "../store/actions/board.actions";
import loadingAnimation from '../assets/imgs/TaskDetails-icons/loading animation.svg'

export function ChangePhotoBackground({ board }) {

    const [images, setImages] = useState()

    useEffect(() => {
        getBackgroundImages().then(setImages)
    }, [])

    async function onUpdateBgc(img) {
        try {
            await updateBoardBgc(board, `url(${img})`)
        } catch (err) {
            console.log('Cannot update img board', err)
        }
    }

    if (!images) return <div className='isloading-container'> <img className='isLoading' src={loadingAnimation}/> </div>

    return (
        <section className="change-photo-background">
            <div className="photos-bgc-container">
                {images.map(img => (
                    <div className="photo-container" key={img.id} onClick={() => onUpdateBgc(img.url)}>
                        <img
                            className="photo"
                            src={img.smallUrl}
                        ></img>
                    </div>
                ))}
            </div>
            <div className="photos-footer">
                <div className="unsplash-disclaimer">
                    By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms" target="_blank">Terms of Service</a>
                </div>
            </div>
        </section>
    )
}