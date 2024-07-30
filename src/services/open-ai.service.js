import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";

export const openAiService = {
    onGetBoardFromGpt
}

async function onGetBoardFromGpt() {
    // const title = "Becoming the best music producer";
    // const title = "Trip to Australia";
    // const title = "Master fullstack programming";
    const title = prompt('Name the project you\'d like to create')

    const payload = { title };

    try {
        const res = await axios.post("http://localhost:3030/api/open-ai", payload);
        const board = await getBoardImgsFromGptObject(res.data)
        console.log(board)
    } catch (er) {
        console.error(er);
    }
}

async function getBoardImgsFromGptObject(board) {
    console.log(board)
    const updatedBoard = { ...board }
    updatedBoard.style.background = getUnsplashImageByQuery(updatedBoard.style.background)
    const { groups } = updatedBoard
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        const { tasks } = group
        for (let j = 0; j < tasks.length; j++) {
            const task = tasks[j]
            if (task?.style?.backgroundImage) task.style.backgroundImage = await getUnsplashImageByQuery(task.style.backgroundImage)
        }
    }
    return updatedBoard
}