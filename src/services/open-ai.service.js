import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";

export const openAiService = {
    onGetBoardFromGpt
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/open-ai'
    : '//localhost:3030/api/open-ai'

async function onGetBoardFromGpt(title, user) {
    const payload = { title };

    try {
        const res = await axios.post(BASE_URL, payload);
        if (res.data.error) {
            console.error('Error from backend:', res.data.error);
            console.error('Error details:', res.data.details);
            console.error('Error content:', res.data.content || '');
            throw new Error(res.data.error);
        }
        console.log('Raw response from GPT:', JSON.stringify(res.data));
        const board = await updateBoardImgsFromGptObject(res.data);
        return fillEmptyValues(board, user);
    } catch (er) {
        console.error('Error in onGetBoardFromGpt:', er.message);
        throw er;
    }
}

async function updateBoardImgsFromGptObject(board) {
    console.log('Initial board from GPT:', JSON.stringify(board, null, 2));
    
    // Deep copy to avoid mutation of the original structure
    const updatedBoard = JSON.parse(JSON.stringify(board));

    // Update the board's background image
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

    console.log('Final updated board:', JSON.stringify(updatedBoard, null, 2));
    return updatedBoard;
}

function fillEmptyValues(board, user) {
    // Ensure default values are set
    board.createdBy = { ...user };
    board.activities = [];
    board.isStarred = false;
    board.members = [];

    for (let group of board.groups) {
        if (!group.style) group.style = { backgroundColor: null, isCollapse: false };

        for (let task of group.tasks) {
            task.priority = null;
            task.isDone = false;
            task.byMember = { ...user };
            if (!task.style) task.style = { backgroundColor: null, isFull: false };
            if (!task.description) task.description = "";
            if (!task.checklists) task.checklists = [];
            task.attachments = [];
            task.membersIds = [];
        }
    }
    return board;
}