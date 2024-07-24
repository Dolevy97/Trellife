import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'

import { BoardList } from '../cmps/BoardList'
import { Filter } from '../cmps/BoardFilter'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    return (
        <main className="board-index">
            <header>
                <div className="workspace">
                    <div className="workspace-icon">T</div>
                    <div className="workspace-text">
                        <h3>Trellife</h3>
                    </div>
                </div>
            </header>
            <hr className='horizontal-rule' />

            <section className="board-main">
                <h2 className='boards-header'>Boards</h2>
                <section>
                    <Filter filterBy={filterBy} setFilterBy={setFilterBy} />

                </section>
                <BoardList
                    boards={boards}
                />
            </section>
        </main>
    )
}



// Demo data for backend

// [
//     {
//         "title": "Dynamic AI Solution",
//         "isStarred": false,
//         "archivedAt": null,
//         "createdBy": {
//             "_id": "669feb9e2230c6c496344a6d",
//             "fullname": "Dolev Levy",
//             "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721755447/user-img3_s81g0e.jpg"
//         },
//         "style": {
//             "background": "url(https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmclMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D)"
//         },
//         "labels": [
//             {
//                 "id": "lBNlVyz",
//                 "title": "Essential",
//                 "color": "#0055cc"
//             },
//             {
//                 "id": "lGJyiDU",
//                 "title": "Significant",
//                 "color": "#ae2e24"
//             },
//             {
//                 "id": "lu0aUHA",
//                 "title": "Paramount",
//                 "color": "#5e4db2"
//             },
//             {
//                 "id": "lVnXJNw",
//                 "title": "Clear-Cut",
//                 "color": "#5e4db2"
//             },
//             {
//                 "id": "lI10zNn",
//                 "title": "Critical",
//                 "color": "#a54800"
//             },
//             {
//                 "id": "lmv9qXm",
//                 "title": "Basic",
//                 "color": "#ae2e24"
//             }
//         ],
//         "members": [
//             {
//                 "_id": "669feb9e2230c6c496344a6d",
//                 "fullname": "Dolev Levy",
//                 "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721755447/user-img3_s81g0e.jpg"
//             },
//             {
//                 "_id": "669fec6f2230c6c496344a6e",
//                 "fullname": "Yonatan Hershko",
//                 "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721756772/user-img2_voa515.jpg"
//             },
//             {
//                 "_id": "669fec802230c6c496344a6f",
//                 "fullname": "Jonathan Dolan",
//                 "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721756772/user-img1_ex1xgz.jpg"
//             }
//         ],
//         "groups": [
//             {
//                 "id": "glyLUrq",
//                 "title": "Waiting for Approval",
//                 "archivedAt": null,
//                 "tasks": [
//                     {
//                         "id": "t35ANz1",
//                         "title": "Implement Module",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1724079684767,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clYYYQgS",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdwtJJK9",
//                                         "title": "Conduct customer survey",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": ["669feb9e2230c6c496344a6d"],
//                         "labelsIds": [
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "669feb9e2230c6c496344a6d",
//                             "fullname": "Dolev Levy",
//                             "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721755447/user-img3_s81g0e.jpg"
//                         },
//                         "style": null,
//                         "attachments": []
//                     },
//                     {
//                         "id": "tSsvnsP",
//                         "title": "Implement Module",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1721174152210,
//                         "description": "Update the project management software",
//                         "checklists": [
//                             {
//                                 "id": "clBFoFwy",
//                                 "title": "Daily Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdTNl5BI",
//                                         "title": "Analyze sales data",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": ["669feb9e2230c6c496344a6d"],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "uc4oJNh",
//                             "fullname": "John Rodriguez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#206a83",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "thAQ7AM",
//                         "title": "Test Algorithm",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1722399816443,
//                         "description": "Analyze sales data for the last quarter",
//                         "checklists": [
//                             {
//                                 "id": "cltBcEMq",
//                                 "title": "Daily Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "td8P7cU1",
//                                         "title": "Analyze sales data",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [],
//                         "labelsIds": [
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tBqfBOg",
//                         "title": "Refactor Algorithm",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1722210919159,
//                         "description": "Conduct a customer satisfaction survey",
//                         "checklists": [
//                             {
//                                 "id": "clwui570",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdAxOSRF",
//                                         "title": "Plan team-building event",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tmUE5Dg",
//                         "title": "Implement Algorithm",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1723064122895,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clAE9zvE",
//                                 "title": "Inventory Management",
//                                 "todos": [
//                                     {
//                                         "id": "tdsRnm3H",
//                                         "title": "Coordinate design review",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "gsNNtJu",
//                 "title": "Product Launch",
//                 "archivedAt": null,
//                 "tasks": [
//                     {
//                         "id": "tFmKF84",
//                         "title": "Implement Function",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1723979916806,
//                         "description": "Organize the company event for next month",
//                         "checklists": [
//                             {
//                                 "id": "cld21gEc",
//                                 "title": "Project Milestones",
//                                 "todos": [
//                                     {
//                                         "id": "tdgI0QAs",
//                                         "title": "Create marketing plan",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#5e4db2",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tyabecy",
//                         "title": "Design Function",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1722435285743,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl8yhbmp",
//                                 "title": "Product Launch Steps",
//                                 "todos": [
//                                     {
//                                         "id": "tdoLkFrF",
//                                         "title": "Finalize project plan",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh",
//                             "urQPX7u",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#206a83",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tTlqZnq",
//                         "title": "Implement Framework",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1724217120003,
//                         "description": "Coordinate with the design team to finalize the new product layout, ensuring that all feedback is incorporated and design standards are met",
//                         "checklists": [
//                             {
//                                 "id": "clNT9e0l",
//                                 "title": "Event Planning Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdB5Z2hl",
//                                         "title": "Develop new product feature",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [
//                             "lGJyiDU",
//                             "lI10zNn",
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "gg6jv5S",
//                 "title": "Urgent",
//                 "archivedAt": 1692466727728,
//                 "tasks": [
//                     {
//                         "id": "tfg6agx",
//                         "title": "Design Component",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1721234386808,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clIRbIJB",
//                                 "title": "Supplier Coordination",
//                                 "todos": [
//                                     {
//                                         "id": "tdFfyp5P",
//                                         "title": "Finish the financial report",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u"
//                         ],
//                         "labelsIds": [
//                             "lI10zNn",
//                             "lVnXJNw",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t9pi3eJ",
//                         "title": "Review UI",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1721713633577,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clbAQgeO",
//                                 "title": "Event Planning Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdomDOAt",
//                                         "title": "Prepare the client presentation",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uTSku4u"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tDNRnV9",
//                         "title": "Refactor API",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1721437507401,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clynBDoz",
//                                 "title": "Website Update Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdCcrohb",
//                                         "title": "Analyze sales data",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lGJyiDU",
//                             "lu0aUHA",
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tz2ebNa",
//                         "title": "Optimize Module",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1721552859476,
//                         "description": "Create social media content for the upcoming campaign",
//                         "checklists": [
//                             {
//                                 "id": "clI92S2G",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdlGetHC",
//                                         "title": "Schedule team meeting",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tpTTtaL",
//                         "title": "Debug Database",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1722849271716,
//                         "description": "Research new market trends and report findings",
//                         "checklists": [
//                             {
//                                 "id": "clNC0BuE",
//                                 "title": "Daily Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "td3QyrGa",
//                                         "title": "Write a blog post",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u3WF8kb",
//                             "u7Ybh3A",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tLTTv0V",
//                         "title": "Implement Module",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1721821734833,
//                         "description": "Develop a new feature for the product",
//                         "checklists": [
//                             {
//                                 "id": "cl2KkvZ9",
//                                 "title": "Performance Review Preparation",
//                                 "todos": [
//                                     {
//                                         "id": "tdkex105",
//                                         "title": "Schedule team meeting",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "u7Ybh3A",
//                             "u1AJVsH"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tW6ZxeQ",
//                         "title": "Update Framework",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1721147299675,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clcmo5kA",
//                                 "title": "Quality Assurance Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdOQFf9i",
//                                         "title": "Create social media posts",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t17nyPg",
//                         "title": "Refactor UI",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1722742261929,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cllyl4C7",
//                                 "title": "Supplier Coordination",
//                                 "todos": [
//                                     {
//                                         "id": "td5aJYis",
//                                         "title": "Test software update",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u",
//                             "uc4oJNh",
//                             "u1AJVsH"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz",
//                             "lVnXJNw",
//                             "lGJyiDU"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#206a83",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tLgQQyY",
//                         "title": "Update Function",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1721484401761,
//                         "description": "Plan and execute a team-building event that fosters collaboration and improves team morale, including all logistics and follow-up activities",
//                         "checklists": [
//                             {
//                                 "id": "cl7adJfa",
//                                 "title": "New Employee Onboarding",
//                                 "todos": [
//                                     {
//                                         "id": "td2ZnqMx",
//                                         "title": "Draft business proposal",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [
//                             "lVnXJNw",
//                             "lBNlVyz",
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tgWfETa",
//                         "title": "Update API",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1724092950125,
//                         "description": "Draft a thorough competitive analysis report that evaluates the strengths and weaknesses of our primary competitors. This report should cover market positioning, product offerings, pricing strategies, marketing approaches, customer reviews, and potential threats to our market share. Include actionable recommendations for how we can improve our competitive edge.",
//                         "checklists": [
//                             {
//                                 "id": "clX3qgfQ",
//                                 "title": "Team Meeting Agenda",
//                                 "todos": [
//                                     {
//                                         "id": "tdcPLTgb",
//                                         "title": "Analyze sales data",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tmItYid",
//                         "title": "Review UI",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1724294835878,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clHY8NNk",
//                                 "title": "Sales Target Goals",
//                                 "todos": [
//                                     {
//                                         "id": "tdgQP8I6",
//                                         "title": "Test software update",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u1AJVsH",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tT03yy2",
//                         "title": "Optimize Framework",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1722892290053,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clM74MVn",
//                                 "title": "Inventory Management",
//                                 "todos": [
//                                     {
//                                         "id": "tdrnWQmx",
//                                         "title": "Finalize project plan",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "uc4oJNh",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz",
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "uc4oJNh",
//                             "fullname": "John Rodriguez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tmqQKHc",
//                         "title": "Debug UI",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1722103738966,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl8jGlks",
//                                 "title": "Quality Assurance Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdvsmT9O",
//                                         "title": "Compile competitive analysis",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A",
//                             "uBxD1Ko",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tGvLVwb",
//                         "title": "Optimize API",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1721453327015,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl8QhPnH",
//                                 "title": "Budget Review Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdBNA4oI",
//                                         "title": "Coordinate design review",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lBNlVyz",
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "twsXzqj",
//                         "title": "Refactor Component",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1723663589944,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clqWoaET",
//                                 "title": "Quality Assurance Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdTGhC9B",
//                                         "title": "Test software update",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u3WF8kb",
//                             "u1AJVsH",
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "thXLoPl",
//                         "title": "Refactor Database",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1721315740012,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cld9m39T",
//                                 "title": "Project Milestones",
//                                 "todos": [
//                                     {
//                                         "id": "td9PUzjC",
//                                         "title": "Develop training program",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uTSku4u",
//                             "u1AJVsH"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz",
//                             "lmv9qXm",
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "uc4oJNh",
//                             "fullname": "John Rodriguez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "gitJ0su",
//                 "title": "On Hold",
//                 "archivedAt": 1676019254360,
//                 "tasks": [
//                     {
//                         "id": "t2ONJ0g",
//                         "title": "Design Function",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1722082251405,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clIGpuGN",
//                                 "title": "Customer Feedback Follow-Up",
//                                 "todos": [
//                                     {
//                                         "id": "tdIo4huu",
//                                         "title": "Analyze sales data",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#0055cc",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tejgwAz",
//                         "title": "Refactor API",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1722071409398,
//                         "description": "Research new market trends and report findings",
//                         "checklists": [
//                             {
//                                 "id": "clLes6ii",
//                                 "title": "Website Update Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "td3pVi99",
//                                         "title": "Prepare the client presentation",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lBNlVyz",
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tTsijYU",
//                         "title": "Debug API",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1721812058071,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clVMc5o1",
//                                 "title": "Customer Feedback Follow-Up",
//                                 "todos": [
//                                     {
//                                         "id": "tdiTgx91",
//                                         "title": "Review industry trends",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh",
//                             "u3WF8kb",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tYttoee",
//                         "title": "Implement Framework",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1721605057127,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clrEywm6",
//                                 "title": "Quality Assurance Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdhijrhk",
//                                         "title": "Analyze customer feedback",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lVnXJNw",
//                             "lBNlVyz",
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tB9sW2v",
//                         "title": "Update Algorithm",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1723700136673,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clI58VXb",
//                                 "title": "Website Update Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdanM3VJ",
//                                         "title": "Coordinate design review",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lu0aUHA",
//                             "lGJyiDU"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "teaXDUF",
//                         "title": "Design Component",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1723927764759,
//                         "description": "Review and edit the marketing strategy document",
//                         "checklists": [
//                             {
//                                 "id": "clgpCk3v",
//                                 "title": "Quality Assurance Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdCASbgv",
//                                         "title": "Schedule team meeting",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uTSku4u",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lVnXJNw",
//                             "lGJyiDU"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#206a83",
//                             "isFull": false
//                         },
//                         "attachments": [
//                             {
//                                 "title": "user-img1.jpg",
//                                 "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                 "createdAt": 1721805868883,
//                                 "type": "image/jpeg",
//                                 "backgroundColor": "#838193ff"
//                             },
//                             {
//                                 "title": "user-img2.jpg",
//                                 "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                 "createdAt": 1721805870064,
//                                 "type": "image/jpeg",
//                                 "backgroundColor": "#a4907bff"
//                             },
//                             {
//                                 "title": "user-img3.jpg",
//                                 "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                 "createdAt": 1721805871072,
//                                 "type": "image/jpeg",
//                                 "backgroundColor": "#9a8376ff"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tIuUTw3",
//                         "title": "Design Module",
//                         "isDone": false,
//                         "priority": "medium",
//                         "dueDate": 1723601443729,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clrDi1rj",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "td8owVA7",
//                                         "title": "Create social media posts",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "u7Ybh3A",
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lVnXJNw",
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "gKNNWsP",
//                 "title": "QA Testingasdfasdfasdfasdfasdfasdfasdf",
//                 "archivedAt": null,
//                 "tasks": [
//                     {
//                         "id": "tb5N1gx",
//                         "title": "Debug API",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1723739503727,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl3FBQmw",
//                                 "title": "Budget Review Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdnbnuZV",
//                                         "title": "Analyze customer feedback",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "te2PF0W",
//                         "title": "Optimize Function",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1723673927149,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clykh6LV",
//                                 "title": "Customer Feedback Follow-Up",
//                                 "todos": [
//                                     {
//                                         "id": "tdkNjiNm",
//                                         "title": "Test software update",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tIq63Ug",
//                         "title": "Review Component",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1722952349833,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clknTwGC",
//                                 "title": "Budget Review Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdFjo6sV",
//                                         "title": "Finalize project plan",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tnPsgG1",
//                         "title": "Debug Module",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1722698999656,
//                         "description": "Conduct an in-depth analysis of the customer feedback from the recent survey to identify key areas for improvement and actionable insights",
//                         "checklists": [
//                             {
//                                 "id": "cl1MfJkt",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdskLLBv",
//                                         "title": "Review industry trends",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lGJyiDU",
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#a54800",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tkeESh0",
//                         "title": "Design Database",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1722412821032,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clrntGie",
//                                 "title": "Budget Review Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "tdC5tcNw",
//                                         "title": "Finish the financial report",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uTSku4u",
//                             "urQPX7u"
//                         ],
//                         "labelsIds": [
//                             "lGJyiDU"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#a54800",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tXoM7Op",
//                         "title": "Design Algorithm",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1721863001241,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clEdaJ6I",
//                                 "title": "Sales Target Goals",
//                                 "todos": [
//                                     {
//                                         "id": "tdGJgWLH",
//                                         "title": "Develop new product feature",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A",
//                             "uc4oJNh",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz",
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "uc4oJNh",
//                             "fullname": "John Rodriguez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t8kNRBh",
//                         "title": "Test UI",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1723981979062,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clt6IfR2",
//                                 "title": "Customer Feedback Follow-Up",
//                                 "todos": [
//                                     {
//                                         "id": "tdHbnE9Z",
//                                         "title": "Plan team-building event",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u1AJVsH",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "u7Ybh3A",
//                             "fullname": "Michael Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t8SjBdA",
//                         "title": "Test Database",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1724203815645,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl1vBEO7",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "td8C8CtW",
//                                         "title": "Review industry trends",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lGJyiDU",
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#0055cc",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "teQs0pd",
//                         "title": "Optimize Framework",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1722298483446,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clHmPpk8",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdW33rrW",
//                                         "title": "Create social media posts",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u",
//                             "uTSku4u",
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#206a83",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tSj6MwP",
//                         "title": "Debug Module",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1723273533494,
//                         "description": "Develop a detailed project plan for the upcoming product launch, covering all aspects from initial concept through to final delivery. This plan should include timelines, budget estimates, resource allocation, risk management strategies, and contingency plans to ensure the project stays on track and within budget.",
//                         "checklists": [
//                             {
//                                 "id": "clowWxyQ",
//                                 "title": "New Employee Onboarding",
//                                 "todos": [
//                                     {
//                                         "id": "tdWc2iS1",
//                                         "title": "Write a blog post",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lGJyiDU",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tANCMXL",
//                         "title": "Implement API",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1721788855046,
//                         "description": "Draft a thorough competitive analysis report that evaluates the strengths and weaknesses of our primary competitors. This report should cover market positioning, product offerings, pricing strategies, marketing approaches, customer reviews, and potential threats to our market share. Include actionable recommendations for how we can improve our competitive edge.",
//                         "checklists": [
//                             {
//                                 "id": "cljdoacx",
//                                 "title": "Project Milestones",
//                                 "todos": [
//                                     {
//                                         "id": "tdQeQ1Ej",
//                                         "title": "Analyze customer feedback",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh",
//                             "u3WF8kb"
//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tAwUrv3",
//                         "title": "Implement UI",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1721916579811,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl4IjaKG",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdyjVrhI",
//                                         "title": "Draft business proposal",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u",
//                             "uTSku4u",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lGJyiDU",
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#5e4db2",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "gtoO6KN",
//                 "title": "Research",
//                 "archivedAt": 1717101787825,
//                 "tasks": [
//                     {
//                         "id": "tSbRp80",
//                         "title": "Review API",
//                         "isDone": false,
//                         "priority": "high",
//                         "dueDate": 1722115491707,
//                         "description": "Research new market trends and report findings",
//                         "checklists": [
//                             {
//                                 "id": "clN9OvsP",
//                                 "title": "Website Update Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdf4Cdht",
//                                         "title": "Organize company event",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko",
//                             "urQPX7u"
//                         ],
//                         "labelsIds": [
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#a54800",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t7n8704",
//                         "title": "Review Module",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1722469084288,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clMUI2el",
//                                 "title": "Weekly Goals",
//                                 "todos": [
//                                     {
//                                         "id": "tdZpmyVk",
//                                         "title": "Send monthly newsletter",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA",
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t1LvEv4",
//                         "title": "Refactor Module",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1723036492753,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clMPq1kZ",
//                                 "title": "Customer Feedback Follow-Up",
//                                 "todos": [
//                                     {
//                                         "id": "tdwBMPBl",
//                                         "title": "Create marketing plan",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A",
//                             "u3WF8kb",
//                             "u1AJVsH"
//                         ],
//                         "labelsIds": [
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#0055cc",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "teeQRAx",
//                         "title": "Update Component",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1723745176362,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clQLBQhQ",
//                                 "title": "Marketing Campaign Plan",
//                                 "todos": [
//                                     {
//                                         "id": "td8gl6pm",
//                                         "title": "Create marketing plan",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u7Ybh3A",
//                             "u1AJVsH",
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tlcEXWq",
//                         "title": "Refactor Module",
//                         "isDone": true,
//                         "priority": "low",
//                         "dueDate": 1721228783300,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clUOorho",
//                                 "title": "New Employee Onboarding",
//                                 "todos": [
//                                     {
//                                         "id": "tdrwOHRA",
//                                         "title": "Write a blog post",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [

//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tWMdkE4",
//                         "title": "Review Component",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1721293115046,
//                         "description": "Develop a comprehensive marketing plan for the next quarter, including budget allocation, target audience segmentation, and campaign timelines",
//                         "checklists": [
//                             {
//                                 "id": "clj0IVhs",
//                                 "title": "Monthly Objectives",
//                                 "todos": [
//                                     {
//                                         "id": "tdeGq34P",
//                                         "title": "Plan team-building event",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "urQPX7u"
//                         ],
//                         "labelsIds": [
//                             "lVnXJNw"
//                         ],
//                         "byMember": {
//                             "_id": "uBxD1Ko",
//                             "fullname": "Sophia Garcia",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#7f5f01",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tZ74IgZ",
//                         "title": "Test API",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1723727106023,
//                         "description": "Schedule a team meeting to discuss project milestones",
//                         "checklists": [
//                             {
//                                 "id": "clUjlZFK",
//                                 "title": "Marketing Campaign Plan",
//                                 "todos": [
//                                     {
//                                         "id": "tdRiphaS",
//                                         "title": "Draft business proposal",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uTSku4u",
//                             "urQPX7u",
//                             "uc4oJNh"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lu0aUHA",
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tMBrSmp",
//                         "title": "Test API",
//                         "isDone": true,
//                         "priority": "high",
//                         "dueDate": 1723060797814,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clgjsmgK",
//                                 "title": "Weekly Goals",
//                                 "todos": [
//                                     {
//                                         "id": "tdsRMe44",
//                                         "title": "Review industry trends",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uc4oJNh",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lBNlVyz"
//                         ],
//                         "byMember": {
//                             "_id": "uTSku4u",
//                             "fullname": "Olivia Martinez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tPAjHGm",
//                         "title": "Debug Algorithm",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1723361004999,
//                         "description": "Create a comprehensive employee training program to improve skills and productivity across the organization. This program should include a needs assessment, curriculum development, training materials, scheduling, and a system for evaluating the effectiveness of the training sessions.",
//                         "checklists": [
//                             {
//                                 "id": "clsChNPv",
//                                 "title": "Budget Review Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "td8lTSEd",
//                                         "title": "Compile competitive analysis",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "uBxD1Ko"
//                         ],
//                         "labelsIds": [
//                             "lmv9qXm",
//                             "lI10zNn"
//                         ],
//                         "byMember": {
//                             "_id": "uc4oJNh",
//                             "fullname": "John Rodriguez",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#ae2e24",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tbTq9WG",
//                         "title": "Refactor Framework",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1722796277434,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clQWo7T4",
//                                 "title": "Product Launch Steps",
//                                 "todos": [
//                                     {
//                                         "id": "td3lR4Tz",
//                                         "title": "Draft business proposal",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lVnXJNw",
//                             "lBNlVyz",
//                             "lu0aUHA"
//                         ],
//                         "byMember": {
//                             "_id": "u1AJVsH",
//                             "fullname": "Sophia Davis",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#a54800",
//                             "isFull": false
//                         },
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "tTqlg0W",
//                         "title": "Refactor Algorithm",
//                         "isDone": true,
//                         "priority": "medium",
//                         "dueDate": 1721599140117,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "clXNvIYI",
//                                 "title": "Team Meeting Agenda",
//                                 "todos": [
//                                     {
//                                         "id": "tdlvSLH2",
//                                         "title": "Plan team-building event",
//                                         "isDone": true
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [

//                         ],
//                         "labelsIds": [
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "u3WF8kb",
//                             "fullname": "Sophia Johnson",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                         },
//                         "style": null,
//                         "attachments": [

//                         ]
//                     },
//                     {
//                         "id": "t2NIZlm",
//                         "title": "Refactor API",
//                         "isDone": false,
//                         "priority": "low",
//                         "dueDate": 1723748870376,
//                         "description": "",
//                         "checklists": [
//                             {
//                                 "id": "cl7AUvps",
//                                 "title": "Daily Tasks",
//                                 "todos": [
//                                     {
//                                         "id": "tdo83bYF",
//                                         "title": "Plan team-building event",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "membersIds": [
//                             "u1AJVsH",
//                             "u7Ybh3A"
//                         ],
//                         "labelsIds": [
//                             "lGJyiDU",
//                             "lmv9qXm"
//                         ],
//                         "byMember": {
//                             "_id": "urQPX7u",
//                             "fullname": "Ava Jones",
//                             "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                         },
//                         "style": {
//                             "backgroundColor": "#216e4e",
//                             "isFull": true
//                         },
//                         "attachments": [

//                         ]
//                     }
//                 ],
//                 "style": {

//                 }
//             },
//             {
//                 "id": "VUYqlO",
//                 "title": "asdasd",
//                 "tasks": [

//                 ],
//                 "style": {

//                 },
//                 "archivedAt": null
//             }
//         ],
//         "activities": [
//             {
//                 "id": "79JsoB",
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold",
//                     "archivedAt": 1676019254360,
//                     "tasks": [
//                         {
//                             "id": "t2ONJ0g",
//                             "title": "Design Function",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1722082251405,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clIGpuGN",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdIo4huu",
//                                             "title": "Analyze sales data",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [

//                             ],
//                             "byMember": {
//                                 "_id": "u3WF8kb",
//                                 "fullname": "Sophia Johnson",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#0055cc",
//                                 "isFull": true
//                             },
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tejgwAz",
//                             "title": "Refactor API",
//                             "isDone": true,
//                             "priority": "low",
//                             "dueDate": 1722071409398,
//                             "description": "Research new market trends and report findings",
//                             "checklists": [
//                                 {
//                                     "id": "clLes6ii",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "td3pVi99",
//                                             "title": "Prepare the client presentation",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tTsijYU",
//                             "title": "Debug API",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721812058071,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clVMc5o1",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdiTgx91",
//                                             "title": "Review industry trends",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lu0aUHA",
//                                 "lBNlVyz"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tYttoee",
//                             "title": "Implement Framework",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721605057127,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrEywm6",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdhijrhk",
//                                             "title": "Analyze customer feedback",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tB9sW2v",
//                             "title": "Update Algorithm",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1723700136673,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clI58VXb",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdanM3VJ",
//                                             "title": "Coordinate design review",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lu0aUHA",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "teaXDUF",
//                             "title": "Design Component",
//                             "isDone": false,
//                             "priority": "low",
//                             "dueDate": 1723927764759,
//                             "description": "Review and edit the marketing strategy document",
//                             "checklists": [
//                                 {
//                                     "id": "clgpCk3v",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdCASbgv",
//                                             "title": "Schedule team meeting",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uTSku4u",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#206a83",
//                                 "isFull": false
//                             },
//                             "attachments": [
//                                 {
//                                     "title": "user-img1.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                     "createdAt": 1721805868883,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#838193ff"
//                                 },
//                                 {
//                                     "title": "user-img2.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                     "createdAt": 1721805870064,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#a4907bff"
//                                 },
//                                 {
//                                     "title": "user-img3.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                     "createdAt": 1721805871072,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#9a8376ff"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "tIuUTw3",
//                             "title": "Design Module",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1723601443729,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrDi1rj",
//                                     "title": "Monthly Objectives",
//                                     "todos": [
//                                         {
//                                             "id": "td8owVA7",
//                                             "title": "Create social media posts",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uBxD1Ko",
//                                 "u7Ybh3A",
//                                 "uc4oJNh"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lVnXJNw",
//                                 "lI10zNn"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         }
//                     ],
//                     "style": {

//                     }
//                 },
//                 "task": {
//                     "id": "teaXDUF",
//                     "title": "Design Component",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1723927764759,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "clgpCk3v",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdCASbgv",
//                                     "title": "Schedule team meeting",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u1AJVsH",
//                         "fullname": "Sophia Davis",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [
//                         {
//                             "title": "user-img1.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                             "createdAt": 1721805868883,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#838193ff"
//                         },
//                         {
//                             "title": "user-img2.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                             "createdAt": 1721805870064,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#a4907bff"
//                         },
//                         {
//                             "title": "user-img3.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                             "createdAt": 1721805871072,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#9a8376ff"
//                         }
//                     ]
//                 },
//                 "txt": "קוקוקו\n",
//                 "byMember": {
//                     "_id": "ugO7DCL",
//                     "fullname": "James Davis",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "title": "add comment",
//                 "createdAt": 1721805980307
//             },
//             {
//                 "id": "IGfVOa",
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold",
//                     "archivedAt": 1676019254360,
//                     "tasks": [
//                         {
//                             "id": "t2ONJ0g",
//                             "title": "Design Function",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1722082251405,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clIGpuGN",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdIo4huu",
//                                             "title": "Analyze sales data",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [

//                             ],
//                             "byMember": {
//                                 "_id": "u3WF8kb",
//                                 "fullname": "Sophia Johnson",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#0055cc",
//                                 "isFull": true
//                             },
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tejgwAz",
//                             "title": "Refactor API",
//                             "isDone": true,
//                             "priority": "low",
//                             "dueDate": 1722071409398,
//                             "description": "Research new market trends and report findings",
//                             "checklists": [
//                                 {
//                                     "id": "clLes6ii",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "td3pVi99",
//                                             "title": "Prepare the client presentation",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tTsijYU",
//                             "title": "Debug API",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721812058071,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clVMc5o1",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdiTgx91",
//                                             "title": "Review industry trends",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lu0aUHA",
//                                 "lBNlVyz"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tYttoee",
//                             "title": "Implement Framework",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721605057127,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrEywm6",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdhijrhk",
//                                             "title": "Analyze customer feedback",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tB9sW2v",
//                             "title": "Update Algorithm",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1723700136673,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clI58VXb",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdanM3VJ",
//                                             "title": "Coordinate design review",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lu0aUHA",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "teaXDUF",
//                             "title": "Design Component",
//                             "isDone": false,
//                             "priority": "low",
//                             "dueDate": 1723927764759,
//                             "description": "Review and edit the marketing strategy document",
//                             "checklists": [
//                                 {
//                                     "id": "clgpCk3v",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdCASbgv",
//                                             "title": "Schedule team meeting",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uTSku4u",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#206a83",
//                                 "isFull": false
//                             },
//                             "attachments": [
//                                 {
//                                     "title": "user-img1.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                     "createdAt": 1721805868883,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#838193ff"
//                                 },
//                                 {
//                                     "title": "user-img2.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                     "createdAt": 1721805870064,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#a4907bff"
//                                 },
//                                 {
//                                     "title": "user-img3.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                     "createdAt": 1721805871072,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#9a8376ff"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "tIuUTw3",
//                             "title": "Design Module",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1723601443729,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrDi1rj",
//                                     "title": "Monthly Objectives",
//                                     "todos": [
//                                         {
//                                             "id": "td8owVA7",
//                                             "title": "Create social media posts",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uBxD1Ko",
//                                 "u7Ybh3A",
//                                 "uc4oJNh"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lVnXJNw",
//                                 "lI10zNn"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         }
//                     ],
//                     "style": {

//                     }
//                 },
//                 "task": {
//                     "id": "teaXDUF",
//                     "title": "Design Component",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1723927764759,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "clgpCk3v",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdCASbgv",
//                                     "title": "Schedule team meeting",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u1AJVsH",
//                         "fullname": "Sophia Davis",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [
//                         {
//                             "title": "user-img1.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                             "createdAt": 1721805868883,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#838193ff"
//                         },
//                         {
//                             "title": "user-img2.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                             "createdAt": 1721805870064,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#a4907bff"
//                         },
//                         {
//                             "title": "user-img3.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                             "createdAt": 1721805871072,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#9a8376ff"
//                         }
//                     ]
//                 },
//                 "txt": "fgjfghjfgj",
//                 "byMember": {
//                     "_id": "uMH6iKB",
//                     "fullname": "Michael Miller",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "title": "add comment",
//                 "createdAt": 1721805876968
//             },
//             {
//                 "id": "XPCgOR",
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold",
//                     "archivedAt": 1676019254360,
//                     "tasks": [
//                         {
//                             "id": "t2ONJ0g",
//                             "title": "Design Function",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1722082251405,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clIGpuGN",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdIo4huu",
//                                             "title": "Analyze sales data",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [

//                             ],
//                             "byMember": {
//                                 "_id": "u3WF8kb",
//                                 "fullname": "Sophia Johnson",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#0055cc",
//                                 "isFull": true
//                             },
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tejgwAz",
//                             "title": "Refactor API",
//                             "isDone": true,
//                             "priority": "low",
//                             "dueDate": 1722071409398,
//                             "description": "Research new market trends and report findings",
//                             "checklists": [
//                                 {
//                                     "id": "clLes6ii",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "td3pVi99",
//                                             "title": "Prepare the client presentation",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tTsijYU",
//                             "title": "Debug API",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721812058071,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clVMc5o1",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdiTgx91",
//                                             "title": "Review industry trends",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lu0aUHA",
//                                 "lBNlVyz"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tYttoee",
//                             "title": "Implement Framework",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721605057127,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrEywm6",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdhijrhk",
//                                             "title": "Analyze customer feedback",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tB9sW2v",
//                             "title": "Update Algorithm",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1723700136673,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clI58VXb",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdanM3VJ",
//                                             "title": "Coordinate design review",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lu0aUHA",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "teaXDUF",
//                             "title": "Design Component",
//                             "isDone": false,
//                             "priority": "low",
//                             "dueDate": 1723927764759,
//                             "description": "Review and edit the marketing strategy document",
//                             "checklists": [
//                                 {
//                                     "id": "clgpCk3v",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdCASbgv",
//                                             "title": "Schedule team meeting",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uTSku4u",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#206a83",
//                                 "isFull": false
//                             },
//                             "attachments": [
//                                 {
//                                     "title": "user-img1.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                     "createdAt": 1721805868883,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#838193ff"
//                                 },
//                                 {
//                                     "title": "user-img2.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                     "createdAt": 1721805870064,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#a4907bff"
//                                 },
//                                 {
//                                     "title": "user-img3.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                     "createdAt": 1721805871072,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#9a8376ff"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "tIuUTw3",
//                             "title": "Design Module",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1723601443729,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrDi1rj",
//                                     "title": "Monthly Objectives",
//                                     "todos": [
//                                         {
//                                             "id": "td8owVA7",
//                                             "title": "Create social media posts",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uBxD1Ko",
//                                 "u7Ybh3A",
//                                 "uc4oJNh"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lVnXJNw",
//                                 "lI10zNn"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         }
//                     ],
//                     "style": {

//                     }
//                 },
//                 "task": {
//                     "id": "teaXDUF",
//                     "title": "Design Component",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1723927764759,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "clgpCk3v",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdCASbgv",
//                                     "title": "Schedule team meeting",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u1AJVsH",
//                         "fullname": "Sophia Davis",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [
//                         {
//                             "title": "user-img1.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                             "createdAt": 1721805868883,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#838193ff"
//                         },
//                         {
//                             "title": "user-img2.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                             "createdAt": 1721805870064,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#a4907bff"
//                         },
//                         {
//                             "title": "user-img3.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                             "createdAt": 1721805871072,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#9a8376ff"
//                         }
//                     ]
//                 },
//                 "txt": "fgjhfgjhfgjh",
//                 "byMember": {
//                     "_id": "uuhYYl6",
//                     "fullname": "Robert Martinez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                 },
//                 "title": "add comment",
//                 "createdAt": 1721805875235
//             },
//             {
//                 "id": "qyWRow",
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold",
//                     "archivedAt": 1676019254360,
//                     "tasks": [
//                         {
//                             "id": "t2ONJ0g",
//                             "title": "Design Function",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1722082251405,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clIGpuGN",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdIo4huu",
//                                             "title": "Analyze sales data",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [

//                             ],
//                             "byMember": {
//                                 "_id": "u3WF8kb",
//                                 "fullname": "Sophia Johnson",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#0055cc",
//                                 "isFull": true
//                             },
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tejgwAz",
//                             "title": "Refactor API",
//                             "isDone": true,
//                             "priority": "low",
//                             "dueDate": 1722071409398,
//                             "description": "Research new market trends and report findings",
//                             "checklists": [
//                                 {
//                                     "id": "clLes6ii",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "td3pVi99",
//                                             "title": "Prepare the client presentation",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tTsijYU",
//                             "title": "Debug API",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721812058071,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clVMc5o1",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdiTgx91",
//                                             "title": "Review industry trends",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lu0aUHA",
//                                 "lBNlVyz"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tYttoee",
//                             "title": "Implement Framework",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721605057127,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrEywm6",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdhijrhk",
//                                             "title": "Analyze customer feedback",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tB9sW2v",
//                             "title": "Update Algorithm",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1723700136673,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clI58VXb",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdanM3VJ",
//                                             "title": "Coordinate design review",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lu0aUHA",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "teaXDUF",
//                             "title": "Design Component",
//                             "isDone": false,
//                             "priority": "low",
//                             "dueDate": 1723927764759,
//                             "description": "Review and edit the marketing strategy document",
//                             "checklists": [
//                                 {
//                                     "id": "clgpCk3v",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdCASbgv",
//                                             "title": "Schedule team meeting",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uTSku4u",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#206a83",
//                                 "isFull": false
//                             },
//                             "attachments": [
//                                 {
//                                     "title": "user-img1.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                     "createdAt": 1721805868883,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#838193ff"
//                                 },
//                                 {
//                                     "title": "user-img2.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                     "createdAt": 1721805870064,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#a4907bff"
//                                 },
//                                 {
//                                     "title": "user-img3.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                     "createdAt": 1721805871072,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#9a8376ff"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "tIuUTw3",
//                             "title": "Design Module",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1723601443729,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrDi1rj",
//                                     "title": "Monthly Objectives",
//                                     "todos": [
//                                         {
//                                             "id": "td8owVA7",
//                                             "title": "Create social media posts",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uBxD1Ko",
//                                 "u7Ybh3A",
//                                 "uc4oJNh"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lVnXJNw",
//                                 "lI10zNn"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         }
//                     ],
//                     "style": {

//                     }
//                 },
//                 "task": {
//                     "id": "teaXDUF",
//                     "title": "Design Component",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1723927764759,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "clgpCk3v",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdCASbgv",
//                                     "title": "Schedule team meeting",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u1AJVsH",
//                         "fullname": "Sophia Davis",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [
//                         {
//                             "title": "user-img1.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                             "createdAt": 1721805868883,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#838193ff"
//                         },
//                         {
//                             "title": "user-img2.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                             "createdAt": 1721805870064,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#a4907bff"
//                         },
//                         {
//                             "title": "user-img3.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                             "createdAt": 1721805871072,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#9a8376ff"
//                         }
//                     ]
//                 },
//                 "txt": "fgjhfgjh",
//                 "byMember": {
//                     "_id": "uZutwyD",
//                     "fullname": "Ava Johnson",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "title": "add comment",
//                 "createdAt": 1721805873624
//             },
//             {
//                 "id": "a2HFPpT",
//                 "title": "add task",
//                 "byMember": {
//                     "_id": "uc4oJNh",
//                     "fullname": "John Rodriguez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                 },
//                 "group": {
//                     "id": "gKNNWsP",
//                     "title": "QA Testing"
//                 },
//                 "task": {
//                     "id": "tnPsgG1",
//                     "title": "Debug Module",
//                     "isDone": true,
//                     "priority": "high",
//                     "dueDate": 1722698999656,
//                     "description": "Conduct an in-depth analysis of the customer feedback from the recent survey to identify key areas for improvement and actionable insights",
//                     "checklists": [
//                         {
//                             "id": "cl1MfJkt",
//                             "title": "Monthly Objectives",
//                             "todos": [
//                                 {
//                                     "id": "tdskLLBv",
//                                     "title": "Review industry trends",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uBxD1Ko",
//                         "u7Ybh3A"
//                     ],
//                     "labelsIds": [
//                         "lGJyiDU",
//                         "lVnXJNw"
//                     ],
//                     "byMember": {
//                         "_id": "uBxD1Ko",
//                         "fullname": "Sophia Garcia",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#a54800",
//                         "isFull": false
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1693011763923
//             },
//             {
//                 "id": "aY7GuAX",
//                 "title": "add task",
//                 "byMember": {
//                     "_id": "uc4oJNh",
//                     "fullname": "John Rodriguez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                 },
//                 "group": {
//                     "id": "ggHhbfZ",
//                     "title": "Personal Tasks"
//                 },
//                 "task": {
//                     "id": "tTtlyfu",
//                     "title": "Update Algorithm",
//                     "isDone": true,
//                     "priority": "medium",
//                     "dueDate": 1722338400682,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "cly7WDgT",
//                             "title": "Weekly Goals",
//                             "todos": [
//                                 {
//                                     "id": "td0WzYxA",
//                                     "title": "Analyze sales data",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uc4oJNh",
//                         "uBxD1Ko",
//                         "u7Ybh3A"
//                     ],
//                     "labelsIds": [
//                         "lGJyiDU",
//                         "lI10zNn",
//                         "lBNlVyz"
//                     ],
//                     "byMember": {
//                         "_id": "u7Ybh3A",
//                         "fullname": "Michael Jones",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1704514181639
//             },
//             {
//                 "id": "axL1671",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "u1AJVsH",
//                     "fullname": "Sophia Davis",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "ggHhbfZ",
//                     "title": "Personal Tasks"
//                 },
//                 "task": {
//                     "id": "tDOCBZ2",
//                     "title": "Review Module",
//                     "isDone": true,
//                     "priority": "high",
//                     "dueDate": 1724126954544,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clildUWH",
//                             "title": "Monthly Objectives",
//                             "todos": [
//                                 {
//                                     "id": "td6Gebt7",
//                                     "title": "Update project management software",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "u3WF8kb",
//                         "urQPX7u"
//                     ],
//                     "labelsIds": [
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u3WF8kb",
//                         "fullname": "Sophia Johnson",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#0055cc",
//                         "isFull": false
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1705421628200
//             },
//             {
//                 "id": "ahYI64R",
//                 "title": "add task",
//                 "byMember": {
//                     "_id": "uc4oJNh",
//                     "fullname": "John Rodriguez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                 },
//                 "group": {
//                     "id": "gg6jv5S",
//                     "title": "Urgent"
//                 },
//                 "task": {
//                     "id": "thXLoPl",
//                     "title": "Refactor Database",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1721315740012,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "cld9m39T",
//                             "title": "Project Milestones",
//                             "todos": [
//                                 {
//                                     "id": "td9PUzjC",
//                                     "title": "Develop training program",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "u1AJVsH"
//                     ],
//                     "labelsIds": [
//                         "lBNlVyz",
//                         "lmv9qXm",
//                         "lVnXJNw"
//                     ],
//                     "byMember": {
//                         "_id": "uc4oJNh",
//                         "fullname": "John Rodriguez",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1680455663765
//             },
//             {
//                 "id": "ad8tibc",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "u1AJVsH",
//                     "fullname": "Sophia Davis",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "ggHhbfZ",
//                     "title": "Personal Tasks"
//                 },
//                 "task": {
//                     "id": "tDOCBZ2",
//                     "title": "Review Module",
//                     "isDone": true,
//                     "priority": "high",
//                     "dueDate": 1724126954544,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clildUWH",
//                             "title": "Monthly Objectives",
//                             "todos": [
//                                 {
//                                     "id": "td6Gebt7",
//                                     "title": "Update project management software",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "u3WF8kb",
//                         "urQPX7u"
//                     ],
//                     "labelsIds": [
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u3WF8kb",
//                         "fullname": "Sophia Johnson",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#0055cc",
//                         "isFull": false
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1705334503710
//             },
//             {
//                 "id": "aEd7G2R",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "u7Ybh3A",
//                     "fullname": "Michael Jones",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "gg6jv5S",
//                     "title": "Urgent"
//                 },
//                 "task": {
//                     "id": "tmItYid",
//                     "title": "Review UI",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1724294835878,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clHY8NNk",
//                             "title": "Sales Target Goals",
//                             "todos": [
//                                 {
//                                     "id": "tdgQP8I6",
//                                     "title": "Test software update",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "u1AJVsH",
//                         "u7Ybh3A"
//                     ],
//                     "labelsIds": [

//                     ],
//                     "byMember": {
//                         "_id": "u3WF8kb",
//                         "fullname": "Sophia Johnson",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1710396973592
//             },
//             {
//                 "id": "any1ZXn",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "uTSku4u",
//                     "fullname": "Olivia Martinez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "gb8LEi0",
//                     "title": "Low Priority"
//                 },
//                 "task": {
//                     "id": "tlMSKch",
//                     "title": "Refactor UI",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1721213973918,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "cl6Mx1Wv",
//                             "title": "Customer Feedback Follow-Up",
//                             "todos": [
//                                 {
//                                     "id": "tdO0vuSk",
//                                     "title": "Develop training program",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [

//                     ],
//                     "labelsIds": [
//                         "lBNlVyz",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u3WF8kb",
//                         "fullname": "Sophia Johnson",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1718759296893
//             },
//             {
//                 "id": "aL4E8Jh",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "u7Ybh3A",
//                     "fullname": "Michael Jones",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "ggHhbfZ",
//                     "title": "Personal Tasks"
//                 },
//                 "task": {
//                     "id": "t2eEzGP",
//                     "title": "Optimize UI",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1723482933858,
//                     "description": "Coordinate with the design team to finalize the new product layout, ensuring that all feedback is incorporated and design standards are met",
//                     "checklists": [
//                         {
//                             "id": "clp8EWz4",
//                             "title": "Client Meeting Preparation",
//                             "todos": [
//                                 {
//                                     "id": "td14zSBU",
//                                     "title": "Develop new product feature",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uc4oJNh",
//                         "u7Ybh3A",
//                         "uTSku4u"
//                     ],
//                     "labelsIds": [

//                     ],
//                     "byMember": {
//                         "_id": "uc4oJNh",
//                         "fullname": "John Rodriguez",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#ae2e24",
//                         "isFull": true
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1715480178112
//             },
//             {
//                 "id": "aP99UXF",
//                 "title": "add task",
//                 "byMember": {
//                     "_id": "u7Ybh3A",
//                     "fullname": "Michael Jones",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold"
//                 },
//                 "task": {
//                     "id": "tYttoee",
//                     "title": "Implement Framework",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1721605057127,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clrEywm6",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdhijrhk",
//                                     "title": "Analyze customer feedback",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [

//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lBNlVyz",
//                         "lu0aUHA"
//                     ],
//                     "byMember": {
//                         "_id": "u7Ybh3A",
//                         "fullname": "Michael Jones",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1669831620110
//             },
//             {
//                 "id": "ahPJ1tX",
//                 "title": "add task",
//                 "byMember": {
//                     "_id": "uTSku4u",
//                     "fullname": "Olivia Martinez",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "gsNNtJu",
//                     "title": "Product Launch"
//                 },
//                 "task": {
//                     "id": "tyabecy",
//                     "title": "Design Function",
//                     "isDone": true,
//                     "priority": "high",
//                     "dueDate": 1722435285743,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "cl8yhbmp",
//                             "title": "Product Launch Steps",
//                             "todos": [
//                                 {
//                                     "id": "tdoLkFrF",
//                                     "title": "Finalize project plan",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uc4oJNh",
//                         "urQPX7u",
//                         "u3WF8kb"
//                     ],
//                     "labelsIds": [
//                         "lu0aUHA"
//                     ],
//                     "byMember": {
//                         "_id": "uTSku4u",
//                         "fullname": "Olivia Martinez",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1716538706906
//             },
//             {
//                 "id": "auYc2NG",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "uBxD1Ko",
//                     "fullname": "Sophia Garcia",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "gtoO6KN",
//                     "title": "Research"
//                 },
//                 "task": {
//                     "id": "tlcEXWq",
//                     "title": "Refactor Module",
//                     "isDone": true,
//                     "priority": "low",
//                     "dueDate": 1721228783300,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clUOorho",
//                             "title": "New Employee Onboarding",
//                             "todos": [
//                                 {
//                                     "id": "tdrwOHRA",
//                                     "title": "Write a blog post",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [

//                     ],
//                     "labelsIds": [

//                     ],
//                     "byMember": {
//                         "_id": "urQPX7u",
//                         "fullname": "Ava Jones",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1700678491120
//             },
//             {
//                 "id": "aanOHvo",
//                 "title": "add comment",
//                 "byMember": {
//                     "_id": "urQPX7u",
//                     "fullname": "Ava Jones",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "glyLUrq",
//                     "title": "Waiting for Approval"
//                 },
//                 "task": {
//                     "id": "thAQ7AM",
//                     "title": "Test Algorithm",
//                     "isDone": true,
//                     "priority": "high",
//                     "dueDate": 1722399816443,
//                     "description": "Analyze sales data for the last quarter",
//                     "checklists": [
//                         {
//                             "id": "cltBcEMq",
//                             "title": "Daily Tasks",
//                             "todos": [
//                                 {
//                                     "id": "td8P7cU1",
//                                     "title": "Analyze sales data",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uc4oJNh",
//                         "u1AJVsH",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw"
//                     ],
//                     "byMember": {
//                         "_id": "urQPX7u",
//                         "fullname": "Ava Jones",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "txt": "marvelous outstanding",
//                 "createdAt": 1667339526127
//             },
//             {
//                 "id": "aLE8Zto",
//                 "title": "add comment",
//                 "byMember": {
//                     "_id": "uBxD1Ko",
//                     "fullname": "Sophia Garcia",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "gb8LEi0",
//                     "title": "Low Priority"
//                 },
//                 "task": {
//                     "id": "tlMSKch",
//                     "title": "Refactor UI",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1721213973918,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "cl6Mx1Wv",
//                             "title": "Customer Feedback Follow-Up",
//                             "todos": [
//                                 {
//                                     "id": "tdO0vuSk",
//                                     "title": "Develop training program",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [

//                     ],
//                     "labelsIds": [
//                         "lBNlVyz",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u3WF8kb",
//                         "fullname": "Sophia Johnson",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "txt": "outstanding outstanding",
//                 "createdAt": 1667436858974
//             },
//             {
//                 "id": "aXYbOIp",
//                 "title": "add comment",
//                 "byMember": {
//                     "_id": "uBxD1Ko",
//                     "fullname": "Sophia Garcia",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold"
//                 },
//                 "task": {
//                     "id": "tTsijYU",
//                     "title": "Debug API",
//                     "isDone": false,
//                     "priority": "medium",
//                     "dueDate": 1721812058071,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "clVMc5o1",
//                             "title": "Customer Feedback Follow-Up",
//                             "todos": [
//                                 {
//                                     "id": "tdiTgx91",
//                                     "title": "Review industry trends",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uc4oJNh",
//                         "u3WF8kb",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lu0aUHA",
//                         "lBNlVyz"
//                     ],
//                     "byMember": {
//                         "_id": "u7Ybh3A",
//                         "fullname": "Michael Jones",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": null,
//                     "attachments": [

//                     ]
//                 },
//                 "txt": "superb great",
//                 "createdAt": 1699638114866
//             },
//             {
//                 "id": "azQgfIM",
//                 "title": "change cover",
//                 "byMember": {
//                     "_id": "uBxD1Ko",
//                     "fullname": "Sophia Garcia",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                 },
//                 "group": {
//                     "id": "ggHhbfZ",
//                     "title": "Personal Tasks"
//                 },
//                 "task": {
//                     "id": "tgHRVZC",
//                     "title": "Test Framework",
//                     "isDone": true,
//                     "priority": "medium",
//                     "dueDate": 1724186366079,
//                     "description": "",
//                     "checklists": [
//                         {
//                             "id": "cleg6Y1t",
//                             "title": "Performance Review Preparation",
//                             "todos": [
//                                 {
//                                     "id": "tdofGfTA",
//                                     "title": "Create social media posts",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [

//                     ],
//                     "labelsIds": [
//                         "lBNlVyz"
//                     ],
//                     "byMember": {
//                         "_id": "uBxD1Ko",
//                         "fullname": "Sophia Garcia",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#ae2e24",
//                         "isFull": true
//                     },
//                     "attachments": [

//                     ]
//                 },
//                 "createdAt": 1701724413706
//             },
//             {
//                 "id": "aHpsd28",
//                 "title": "attached user-img3.jpg to this card",
//                 "byMember": {
//                     "_id": "u7Ybh3A",
//                     "fullname": "Michael Jones",
//                     "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                 },
//                 "group": {
//                     "id": "gitJ0su",
//                     "title": "On Hold",
//                     "archivedAt": 1676019254360,
//                     "tasks": [
//                         {
//                             "id": "t2ONJ0g",
//                             "title": "Design Function",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1722082251405,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clIGpuGN",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdIo4huu",
//                                             "title": "Analyze sales data",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [

//                             ],
//                             "byMember": {
//                                 "_id": "u3WF8kb",
//                                 "fullname": "Sophia Johnson",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#0055cc",
//                                 "isFull": true
//                             },
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tejgwAz",
//                             "title": "Refactor API",
//                             "isDone": true,
//                             "priority": "low",
//                             "dueDate": 1722071409398,
//                             "description": "Research new market trends and report findings",
//                             "checklists": [
//                                 {
//                                     "id": "clLes6ii",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "td3pVi99",
//                                             "title": "Prepare the client presentation",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tTsijYU",
//                             "title": "Debug API",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721812058071,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clVMc5o1",
//                                     "title": "Customer Feedback Follow-Up",
//                                     "todos": [
//                                         {
//                                             "id": "tdiTgx91",
//                                             "title": "Review industry trends",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uc4oJNh",
//                                 "u3WF8kb",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lu0aUHA",
//                                 "lBNlVyz"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tYttoee",
//                             "title": "Implement Framework",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1721605057127,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrEywm6",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdhijrhk",
//                                             "title": "Analyze customer feedback",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [

//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lBNlVyz",
//                                 "lu0aUHA"
//                             ],
//                             "byMember": {
//                                 "_id": "u7Ybh3A",
//                                 "fullname": "Michael Jones",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "tB9sW2v",
//                             "title": "Update Algorithm",
//                             "isDone": true,
//                             "priority": "high",
//                             "dueDate": 1723700136673,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clI58VXb",
//                                     "title": "Website Update Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdanM3VJ",
//                                             "title": "Coordinate design review",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "u3WF8kb"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lu0aUHA",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         },
//                         {
//                             "id": "teaXDUF",
//                             "title": "Design Component",
//                             "isDone": false,
//                             "priority": "low",
//                             "dueDate": 1723927764759,
//                             "description": "Review and edit the marketing strategy document",
//                             "checklists": [
//                                 {
//                                     "id": "clgpCk3v",
//                                     "title": "Quality Assurance Tasks",
//                                     "todos": [
//                                         {
//                                             "id": "tdCASbgv",
//                                             "title": "Schedule team meeting",
//                                             "isDone": true
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uTSku4u",
//                                 "uBxD1Ko"
//                             ],
//                             "labelsIds": [
//                                 "lVnXJNw",
//                                 "lGJyiDU"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": {
//                                 "backgroundColor": "#206a83",
//                                 "isFull": false
//                             },
//                             "attachments": [
//                                 {
//                                     "title": "user-img1.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                                     "createdAt": 1721805868883,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#838193ff"
//                                 },
//                                 {
//                                     "title": "user-img2.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                                     "createdAt": 1721805870064,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#a4907bff"
//                                 },
//                                 {
//                                     "title": "user-img3.jpg",
//                                     "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                                     "createdAt": 1721805871072,
//                                     "type": "image/jpeg",
//                                     "backgroundColor": "#9a8376ff"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "tIuUTw3",
//                             "title": "Design Module",
//                             "isDone": false,
//                             "priority": "medium",
//                             "dueDate": 1723601443729,
//                             "description": "",
//                             "checklists": [
//                                 {
//                                     "id": "clrDi1rj",
//                                     "title": "Monthly Objectives",
//                                     "todos": [
//                                         {
//                                             "id": "td8owVA7",
//                                             "title": "Create social media posts",
//                                             "isDone": false
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "membersIds": [
//                                 "uBxD1Ko",
//                                 "u7Ybh3A",
//                                 "uc4oJNh"
//                             ],
//                             "labelsIds": [
//                                 "lmv9qXm",
//                                 "lVnXJNw",
//                                 "lI10zNn"
//                             ],
//                             "byMember": {
//                                 "_id": "u1AJVsH",
//                                 "fullname": "Sophia Davis",
//                                 "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                             },
//                             "style": null,
//                             "attachments": [

//                             ]
//                         }
//                     ],
//                     "style": {

//                     }
//                 },
//                 "task": {
//                     "id": "teaXDUF",
//                     "title": "Design Component",
//                     "isDone": false,
//                     "priority": "low",
//                     "dueDate": 1723927764759,
//                     "description": "Review and edit the marketing strategy document",
//                     "checklists": [
//                         {
//                             "id": "clgpCk3v",
//                             "title": "Quality Assurance Tasks",
//                             "todos": [
//                                 {
//                                     "id": "tdCASbgv",
//                                     "title": "Schedule team meeting",
//                                     "isDone": true
//                                 }
//                             ]
//                         }
//                     ],
//                     "membersIds": [
//                         "uTSku4u",
//                         "uBxD1Ko"
//                     ],
//                     "labelsIds": [
//                         "lVnXJNw",
//                         "lGJyiDU"
//                     ],
//                     "byMember": {
//                         "_id": "u1AJVsH",
//                         "fullname": "Sophia Davis",
//                         "imgUrl": "../../../src/assets/imgs/user-imgs/user-img3.jpg"
//                     },
//                     "style": {
//                         "backgroundColor": "#206a83",
//                         "isFull": false
//                     },
//                     "attachments": [
//                         {
//                             "title": "user-img1.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805870/zjkbdudhtrf1qwlukrzo.jpg",
//                             "createdAt": 1721805868883,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#838193ff"
//                         },
//                         {
//                             "title": "user-img2.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805871/b5agrzfnwawwzswso4es.jpg",
//                             "createdAt": 1721805870064,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#a4907bff"
//                         },
//                         {
//                             "title": "user-img3.jpg",
//                             "url": "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721805872/haaqkp2ellfsr56ievnb.jpg",
//                             "createdAt": 1721805871072,
//                             "type": "image/jpeg",
//                             "backgroundColor": "#9a8376ff"
//                         }
//                     ]
//                 }
//             },
//             {
//                 "id": "Rbngfik",
//                 "title": "create board",
//                 "byMember": {
//                     "_id": "669feb9e2230c6c496344a6d",
//                     "fullname": "Dolev Levy",
//                     "imgUrl": "https://res.cloudinary.com/deuaeixmp/image/upload/v1721755447/user-img3_s81g0e.jpg"
//                 },
//                 "group": {},
//                 "task": {},
//                 "createdAt": 1699632114866
//             }
//         ]
//     },
// ]