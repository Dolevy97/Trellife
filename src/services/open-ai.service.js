import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";

export const openAiService = {
    onGetBoardFromGpt
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

async function onGetBoardFromGpt(title,user) {
    const payload = { title };

    try {
        const res = await axios.post(BASE_URL, payload);
        const board = await getBoardImgsFromGptObject(res.data);
        console.log('board from gpt function: ', board);
        return fillEmptyValues(board,user);
    } catch (er) {
        console.error(er);
    }
}

async function getBoardImgsFromGptObject(board) {
    console.log(board);
    const updatedBoard = { ...board };
    updatedBoard.style.background = `url(${(await getUnsplashImageByQuery(updatedBoard.style.background))[0].url})`;
    const { groups } = updatedBoard;
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const { tasks } = group;
        for (let j = 0; j < tasks.length; j++) {
            const task = tasks[j];
            if (task?.style?.backgroundImage) {
                const img = (await getUnsplashImageByQuery(task.style.backgroundImage))[0];
                task.style.backgroundImage = `url(${img.url})`;
                task.style.backgroundColor = img.backgroundColor;
            } 
        }
    }
    console.log('board from unsplash function: ', updatedBoard);
    return updatedBoard;
}

function fillEmptyValues(board,user) {
    // Adding back default values
    board.createdBy = {...user}
    board.activities = [];
    board.isStarred = false;
    board.members = [];
    
    for (let group of board.groups) {
        if (!group.style) group.style = { backgroundColor: null, isCollapse: false };
        
        for (let task of group.tasks) {
            task.priority = null;
            task.isDone = false
            task.byMember = {...user};
            if (!task.style) task.style = defaultTaskStyle;
            if (!task.description) task.description = "";
            if (!task.checklists) task.checklists = [];
            task.attachments = [];
            task.membersIds = [];
            if (!task.style) task.style = null
        }
    }
    return board;
}