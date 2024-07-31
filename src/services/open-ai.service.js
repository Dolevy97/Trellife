import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";

export const openAiService = {
    onGetBoardFromGpt
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/open-ai'
    : '//localhost:3030/api/open-ai'

async function onGetBoardFromGpt(title,user) {
    const payload = { title };

    try {
        const res = await axios.post(BASE_URL, payload);
        if (res.data.error) {
            console.error('Error from backend:', res.data.error);
            console.error('Error details:', res.data.details);
            console.error('Error content:', res.data.content || '');
            throw new Error(res.data.error);
        }
        const board = await getBoardImgsFromGptObject(res.data);
        return fillEmptyValues(board, user);
    } catch (er) {
        console.error('Error in onGetBoardFromGpt:', er.message);
        throw er;  // Optionally rethrow if you want to handle it higher up
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