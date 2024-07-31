import axios from "axios";
import { getUnsplashImageByQuery } from "./util.service";
import { json } from "react-router";

export const openAiService = {
    onGetBoardFromGpt
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/open-ai'
    : '//localhost:3030/api/open-ai'

async function onGetBoardFromGpt(title, user) {

    return new Promise((resolve) => {
        setTimeout(() => {
            const hardCodedJSONBoard1 = `{
                "title": "Trip to Greece",
                "style": {
                    "background": "url(https://images.unsplash.com/photo-1496566084516-c5b96fcbd5c8?ixid=M3w2MzcwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzQwMzd8&ixlib=rb-4.0.3)"
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
                                    "backgroundColor": "#ae2e24"
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
                                    "backgroundImage": "url(https://images.unsplash.com/photo-1471977360223-d8cc63cec57c?ixid=M3w2MzcwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzQwMzl8&ixlib=rb-4.0.3)",
                                    "backgroundColor": "#262c2eff"
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
                                    "backgroundColor": "#596773"
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
                                "style": {
                                    "backgroundColor": "#206e4e"
                                }
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
                                    "backgroundImage": "url(https://images.unsplash.com/photo-1575014638175-42e5dd7538a7?ixid=M3w2MzcwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzQwNDJ8&ixlib=rb-4.0.3)",
                                    "backgroundColor": "#8b9191ff"
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
                                    "backgroundColor": "#4d6b1f"
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
            const hardCodedJSONBoard2 = `{
  "title": "Trip to Greece",
  "style": {
    "background": "url(https://images.unsplash.com/photo-1678036544630-242575470afa?ixid=M3w2MzcwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzY2Nzd8&ixlib=rb-4.0.3)"
  },
  "labels": [
    {
      "id": "label1",
      "title": "Historical Sites",
      "color": "#7f5f02"
    },
    {
      "id": "label2",
      "title": "Beach Activities",
      "color": "#0055cc"
    },
    {
      "id": "label3",
      "title": "Cultural Experiences",
      "color": "#a64700"
    }
  ],
  "groups": [
    {
      "id": "group1",
      "title": "Preparation Phase",
      "tasks": [
        {
          "id": "task1",
          "title": "Book Flights",
          "labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundColor": "#5e4db2"
          },
          "dueDate": 1723248000001
        },
        {
          "id": "task2",
          "title": "Reserve Accommodations",
          "labelsIds": [
            "label2"
          ],
          "style": {
            "backgroundColor": "#1f6a83"
          },
          "dueDate": 1731283200000
        },
        {
          "id": "task3",
          "title": "Travel Insurance",
          "labelsIds": [
            "label3"
          ],
          "style": {
            "backgroundColor": "#ae2e24"
          },
          "dueDate": 1728547200000
        },
        {
          "id": "task4",
          "title": "Create Itinerary",
          "description": "Outline main activities for each day",
          "labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundImage": "url(https://images.unsplash.com/photo-1640179840059-ffb51b831e06?ixid=M3w2MzcwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzY2Nzl8&ixlib=rb-4.0.3)",
            "backgroundColor": "#a8a78fff"
          }
        }
      ],
      "style": {
        "backgroundColor": "#344563"
      }
    },
    {
      "id": "group2",
      "title": "Activities in Athens",
      "tasks": [
        {
          "id": "task5",
          "title": "Visit the Acropolis",
          ".labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundColor": "#943d73"
          },
          "checklists": [
            {
              "id": "checklist1",
              "title": "Visit Checklist",
              "todos": [
                {
                  "id": "todo1",
                  "title": "Buy tickets online",
                  "isDone": false
                },
                {
                  "id": "todo2",
                  "title": "Check opening hours",
                  "isDone": false
                }
              ]
            }
          ]
        },
        {
          "id": "task6",
          "title": "Explore Plaka District",
          "labelsIds": [
            "label3"
          ],
          "style": {
            "backgroundColor": "#596773"
          }
        },
        {
          "id": "task7",
          "title": "Dinner at a Traditional Taverna",
          "labelsIds": [
            "label3"
          ],
          "style": {
            "backgroundColor": "#4d6b1f"
          }
        },
        {
          "id": "task8",
          "title": "Visit the National Archaeological Museum",
          "labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundColor": "#1f6a83"
          }
        }
      ],
      "style": {
        "backgroundColor": "#1A6ED8"
      }
    },
    {
      "id": "group3",
      "title": "Island Hopping",
      "tasks": [
        {
          "id": "task9",
          "title": "Ferry Tickets",
          "labelsIds": [
            "label2"
          ],
          "style": {
            "backgroundColor": "#1f6a83"
          },
          "dueDate": 1735689600000
        },
        {
          "id": "task10",
          "title": "Santorini Visit",
          "labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundColor": "#0055cc"
          }
        },
        {
          "id": "task11",
          "title": "Mykonos Beach Day",
          "labelsIds": [
            "label2"
          ],
          "style": {
            "backgroundColor": "#0055cc"
          },
          "checklists": [
            {
              "id": "checklist2",
              "title": "Beach Day Checklist",
              "todos": [
                {
                  "id": "todo3",
                  "title": "Pack sunscreen",
                  "isDone": false
                },
                {
                  "id": "todo4",
                  "title": "Rent beach umbrella",
                  "isDone": false
                }
              ]
            }
          ]
        },
        {
          "id": "task12",
          "title": "Crete Historical Sites",
          "labelsIds": [
            "label1"
          ],
          "style": {
            "backgroundColor": "#596773"
          }
        }
      ],
      "style": {
        "backgroundColor": "#C26A3E"
      }
    },
    {
      "id": "group4",
      "title": "Cultural Experiences",
      "tasks": [
        {
          "id": "task13",
          "title": "Learn Basic Greek Phrases",
          "labelsIds": [
            "label3"
          ],
          "style": {
            "backgroundColor": "#a64700"
          }
        },
        {
          "id": "task14",
          "title": "Greek Cooking Class",
          "description": "Book a class to learn making traditional Greek dishes",
          "labelsIds": [
            "label3"
          ],
          "style": {
            "backgroundColor": "#206e4e"
          },
          "checklists": [
            {
              "id": "checklist3",
              "title": "Cooking Class Checklist",
              "todos": [
                {
                  "id": "todo5",
                  "title": "Confirm booking",
                  "isDone": false
                },
                {
                  "id": "todo6",
                  "title": "Review recipes",
                  "isDone": false
                }
              ]
            }
          ],
          "dueDate": 1723248000001
        }
      ],
      "style": {
        "backgroundColor": "#B84A45"
      }
    }
  ]
}`
            // const hardCodedBoard = JSON.parse(hardCodedJSONBoard)
            const boardToAdd = fillEmptyValues(JSON.parse(hardCodedJSONBoard1),user)
            resolve(boardToAdd)
        }
            , 5000)})

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
            if (!task.style) task.style = { backgroundColor: null, isFull: false };
            if (!task.description) task.description = "";
            if (!task.checklists) task.checklists = [];
            task.attachments = [];
            task.membersIds = [];
        }
    }
    return board;
}