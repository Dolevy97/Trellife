import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";
import { json } from "react-router";

export const openAiService = {
    getBoardFromGpt,
    getDemoAiBoard
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/open-ai'
    : '//localhost:3030/api/open-ai'

async function getDemoAiBoard(title,user){
    return new Promise((resolve) => {
        setTimeout(() => {
            const hardCodedJSONBoard1 = `{
                "title": "Trip to Greece",
                "style": {
                    "background": "url('https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                },
                "labels": [
                    {
                        "id": "label1",
                        "title": "Historical Sites",
                        "color": "#533f03"
                    },
                    {
                        "id": "label2",
                        "title": "Food & Drinks",
                        "color": "#fea363"
                    },
                    {
                        "id": "label3",
                        "title": "Accommodations",
                        "color": "#4cce97"
                        }
                        ],
                        "groups": [
                            {
                                "id": "group1",
                                "title": "Itinerary Planning",
                                "tasks": [
                                    {
                                        "id": "task1",
                                        "title": "Book flights to Athens",
                                        "description": "",
                                        "labelsIds": [
                                            "label3"
                                            ],
                                            "style": {
                                                "backgroundImage": "url('https://images.unsplash.com/photo-1583708877666-49b849736e1f?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                                "backgroundColor": "#71abce",
                                                "isFull": true
                                },
                                "dueDate": 1723248000001
                            },
                            {
                                "id": "task2",
                                "title": "Reserve accommodations",
                                "description": "Select accommodations in Athens, Santorini, and Crete.",
                                "labelsIds": [
                                    "label3"
                                ],
                                "style": {
                                    "backgroundColor": "#596773"
                                    },
                                    "dueDate": 1723348000001
                                    },
                                    {
                                        "id": "task3",
                                        "title": "Itinerary for Athens",
                                        "description": "",
                                        "labelsIds": [
                                            "label1",
                                            "label2"
                                            ],
                                            "style": {
                                                "backgroundColor": "#1f6a83"
                                                },
                                                "dueDate": 1723448000001,
                                                "checklists": [
                                                    {
                                                        "id": "checklist1",
                                                        "title": "Athens Tour",
                                                        "todos": [
                                                            {
                                                                "id": "todo1",
                                                                "title": "Visit the Acropolis",
                                                                "isDone": false
                                                                },
                                                                {
                                                                    "id": "todo2",
                                                                    "title": "Walk through Plaka",
                                                                    "isDone": false
                                                                    }
                                                                    ]
                                                                    }
                                                                    ]
                                                                    },
                                                                    {
                                                                        "id": "task4",
                                                                        "title": "Car Rental",
                                                                        "description": "",
                                                                        "labelsIds": [
                                                                            "label3"
                                                                            ],
                                                                            "style": {
                                                                                "backgroundColor": "#596773"
                                                                                }
                                                                                }
                                                                                ],
                                                                                "style": {
                                        "backgroundColor": "#344563"
                                        }
                                        },
                                        {
                                            "id": "group2",
                                            "title": "Culinary Experiences",
                                            "tasks": [
                                                {
                                                    "id": "task5",
                                                    "title": "Taste local wines",
                                                    "description": "",
                                                    "labelsIds": [
                                                        "label2"
                                                        ],
                                                        "style": {
                                                            "backgroundColor": "#0065cc"
                                                            }
                                                            },
                                                            {
                                                                "id": "task6",
                                                                "title": "Cooking Classes in Crete",
                                                                "description": "Learn to cook traditional Cretan dishes.",
                                                                "labelsIds": [
                                                                    "label2"
                                                                    ],
                                                                    "style": {
                                                                        "backgroundColor": "#ae2e24"
                                                                        },
                                                                        "checklists": [
                                                                            {
                                                                                "id": "checklist2",
                                                                                "title": "Cooking Essentials",
                                                                                "todos": [
                                                                                    {
                                                                                        "id": "todo3",
                                                                                        "title": "Buy ingredients",
                                                                                        "isDone": false
                                                                                        },
                                                                                        {
                                                                                            "id": "todo4",
                                                                                            "title": "Confirm booking",
                                                                                            "isDone": false
                                                                                            }
                                                                                            ]
                                                                                            }
                                                                                            ]
                                                                                            },
                                                                                            {
                                                                                                "id": "task7",
                                                                                                "title": "Food tour in Athens",
                                                                                                "description": "Experience a variety of Greek cuisines.",
                                                                                                "labelsIds": [
                                                                                                    "label2"
                                                                                                    ],
                                                                                                    "style": {
                                                                                                        "backgroundImage": "url('https://plus.unsplash.com/premium_photo-1686285541226-44d0d185ad4f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                                                                                        "backgroundColor": "#a47c47",
                                                                                                        "isFull": true
                                                                                                        }
                                                                                                        },
                                                                                                        {
                                                                                                            "id": "task8",
                                                                                                            "title": "Dinner reservations",
                                                                                                            "description": "",
                                                                                                            "labelsIds": [
                                                                                                                "label2"
                                                                                                                ],
                                                                                                                "style": {
                                                                                                                    "backgroundColor": "#943d73"
                                                                                                                    }
                                                                                                                    }
                                                                                                                    ],
                                                                                                                    "style": {
                                                                                                                        "backgroundColor": "#7B6CC1"
                                                                                                                        }
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "id": "group3",
                                                                                                                            "title": "Cultural Tours",
                                                                                                                            "tasks": [
                                                                                                                                {
                                                                                                                                    "id": "task9",
                                                                                                                                    "title": "Guided tours of historical sites",
                                                                                                                                    "description": "",
                                                                                                                                    "labelsIds": [
                                                                                                                                        "label1"
                                                                                                                                        ],
                                                                                                                                        "style": null
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            "id": "task10",
                                                                                                                                            "title": "Museum visits",
                                                                                                                                            "description": "Plan visits to the National Archaeological Museum and Museum of Cycladic Art.",
                                                                                                                                            "labelsIds": [
                                                                                                                                                "label1"
                                                                                                                                                ],
                                                                                                                                                "style": {
                                                                                                                                                    "backgroundColor": "#5e4db2"
                                                                                                                                                    }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "task11",
                                                                                                                                                        "title": "Live Greek music nights",
                                                                                                                                                        "description": "",
                                                                                                                                                        "labelsIds": [
                                                                                                                                                            "label1"
                                                                                                                                                            ],
                                                                                                                                                            "style": {
                                                                                                                                                                "backgroundColor": "#0055cc"
                                                                                                                                                                }
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                    "id": "task12",
                                                                                                                                                                    "title": "Mythology tour",
                                                                                                                                                                    "description": "",
                                                                                                                                                                    "labelsIds": [
                                                                                                                                                                        "label1"
                                                                                                                                                                        ],
                                                                                                                                                                        "style": {
                                                                                                                                                                            "backgroundImage": "url('https://plus.unsplash.com/premium_photo-1676391702953-f6ef6316eb0a?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                                                                                                                                                            "backgroundColor": "#847e75",
                                                                                                                                                                            "isFull": true
                                                                                                                                                                            }
                                                                                                                                                                            }
                                                                                                                                                                            ],
                                                                                                                                                                            "style": {
                                                                                                                                                                                "backgroundColor": "#216e4e"
                                                                                                                                                                                }
                                                                                                                                                                                },
                                                                                                                                                                                {
                                                                                                                                                                                    "id": "group4",
                                                                                                                                                                                    "title": "Adventure Activities",
                                                                                                                                                                                    "tasks": [
                                                                                                                                                                                        {
                                                                                                                                                                                            "id": "task13",
                                                                                                                                                                                            "title": "Scuba diving in Santorini",
                                                                                                                                                                                            "description": "",
                                                                                                                                                                                            "labelsIds": [
                                                                                                                                                                                                "label1"
                                                                                                                                                                                                ],
                                                                                                                                                                                                "style": {
                                                                                                                                                                                                    "backgroundImage": "url('https://plus.unsplash.com/premium_photo-1661265851801-e523847e3932?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                                                                                                                                                                                    "backgroundColor": "#2a79ad",
                                                                                                                                                                                                    "isFull": true
                                }
                            },
                            {
                                "id": "task14",
                                "title": "Hiking the Samaria Gorge",
                                "description": "",
                                "labelsIds": [
                                    "label1"
                                ],
                                "style": {
                                    "backgroundColor": "#596773"
                                },
                                "checklists": [
                                    {
                                        "id": "checklist3",
                                        "title": "Hiking Preparation",
                                        "todos": [
                                            {
                                                "id": "todo5",
                                                "title": "Pack hiking gear",
                                                "isDone": false
                                            },
                                            {
                                                "id": "todo6",
                                                "title": "Check weather conditions",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": "task15",
                                "title": "Kitesurfing in Paros",
                                "description": "",
                                "labelsIds": [
                                    "label1"
                                ],
                                "style": {
                                    "backgroundColor": "#943d73"
                                }
                            },
                            {
                                "id": "task16",
                                "title": "Mountain biking in Naxos",
                                "description": "",
                                "labelsIds": [
                                    "label1"
                                ],
                                "style": {
                                    "backgroundColor": "#ae2e24"
                                }
                            }
                        ],
                        "style": {
                            "backgroundColor": "#C26A3E"
                        }
                    }
                ]
            }`
            const boardToAdd = fillEmptyValues(JSON.parse(hardCodedJSONBoard1), user)
            resolve(boardToAdd)
        }
            , 12000)
    })
}

async function getBoardFromGpt(title, user) {

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
        const boardToAdd = fillEmptyValues(board, user);
        return boardToAdd
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
            if (!task.style) task.style = null;
            if (!task.description) task.description = "";
            if (!task.checklists) task.checklists = [];
            task.attachments = [];
            task.membersIds = [];
        }
    }
    return board;
}