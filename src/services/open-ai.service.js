import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";

export const openAiService = {
    onGetBoardFromGpt
}

async function onGetBoardFromGpt(title) {
    
    const payload = { title };

    try {
        const res = await axios.post("http://localhost:3030/api/open-ai", payload);
        const board = await getBoardImgsFromGptObject(res.data)
        console.log ('board from gpt function: ', board)
        return (board)
    } catch (er) {
        console.error(er);
    }
}

async function getBoardImgsFromGptObject(board) {
    console.log(board)
    const updatedBoard = { ...board }
    updatedBoard.style.background = `url(${(await getUnsplashImageByQuery(updatedBoard.style.background))[0].url})`
    const { groups } = updatedBoard
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        const { tasks } = group
        for (let j = 0; j < tasks.length; j++) {
            const task = tasks[j]
            if (task?.style?.backgroundImage){
                const img = (await getUnsplashImageByQuery(task.style.backgroundImage))[0]
                task.style.backgroundImage = `url(${img.url})`
                task.style.backgroundColor = img.backgroundColor
            } 
                
        }
    }
    console.log ('board from unsplash function: ', updatedBoard)
    return updatedBoard
}