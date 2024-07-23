import { getRandomColor, getRandomIntInclusive, getRandomTimestamp, makeId } from "../util.service"


export const boardDemoDataService = {
    createDemoBoards
}

function createDemoBoards(length = 20) {
    const boards = []
    for (let i = 0; i < length; i++) {
        boards.push(_createDemoBoard())
    }
    return boards
}

function _createDemoBoard() {
    const board = {
        _id: makeId(),
        title: _getProjectTitle(),
        isStarred: getRandomIntInclusive(0, 9) < 3 ? true : false,
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? _getRandomTimestamp() : null,
        createdBy: getRandomMember(),
        style: {
            // background: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            background: _getRandomBoardBackground()
        },
        labels: _getRandomLabels(),
        members: _getRandomMembers(),
    }
    board.groups = _getRandomGroups(board)
    board.activities = _getRandomActivities(board)
    // board.activities.forEach(a=>console.log(a.task))
    return board
}

function _getRandomBoardBackground() {
    const imgsUrls = {
        large: [
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1469528209190-4a45a86d817b?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmclMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1545609884-564825fd2238?q=80&w=3729&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1711117960822-ac591c668a84?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1578836537282-3171d77f8632?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1434394673726-e8232a5903b4?q=80&w=3587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1624979679474-1da6b7344672?q=80&w=3571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1569458582195-286d4ab6e63e?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmclMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D',
            'https://plus.unsplash.com/premium_photo-1673688152102-b24caa6e8725?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

        ],
        small: [
            'https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2dyYW1taW5nJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmclMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D',
            'https://plus.unsplash.com/premium_photo-1720552289113-c799bbfb7675?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1721406769891-f2ba651401d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1721367631547-b1f591529511?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY0fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://plus.unsplash.com/premium_photo-1721372470713-e5b037af1ceb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY4fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/photo-1721497684662-cf36f0ee232e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/photo-1567947999405-4f3b8361d208?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/uploads/141327328038701afeede/eda0fb7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/photo-1414170562806-9d670e90c091?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/photo-1557162471-f379fb3278a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D'
        ]

    }
    if (getRandomIntInclusive(1, 5) === 1) return getRandomColor()
    const urls = (getRandomIntInclusive(1, 3) === 1) ? [...imgsUrls.small] : [...imgsUrls.large]
    const bg = `url(${urls[getRandomIntInclusive(0, urls.length - 1)]})`
    return bg
}

function _getRandomActivities(board) {
    const length = getRandomIntInclusive(10, 50)
    const activities = []
    for (let i = 0; i < length; i++) {
        const activity = _getRandomActivity(board)
        if (!activity) continue
        activities.push(activity)
    }
    return activities
}

function _getRandomActivity(board) {
    const activity = {
        id: 'a' + makeId(),
        title: _getRandomActivityTitle(),
        byMember: _getRandomActivityMember(board),
        group: _getRandomActivityGroup(board),
    }

    activity.task = _getRandomActivityTask(activity.group)
    if (!activity.task) return null
    if (activity.title === 'add comment') activity.txt = _getRandomComment()
    activity.group = { id: activity.group.id, title: activity.group.title }
    activity.createdAt = getRandomTimestamp()
    return activity
}

function _getRandomActivityTask(group) {
    const tasks = group.tasks
    if (!tasks.length) return null
    const randTask = tasks[getRandomIntInclusive(0, tasks.length - 1)]
    // const task = {
    //     id: randTask.id,
    //     title: randTask.title
    // }
    return randTask
}

function _getRandomComment() {
    const words = ['amazing', 'great', 'fantastic', 'awesome', 'incredible', 'superb', 'wonderful', 'excellent', 'outstanding', 'marvelous']
    const numOfWords = getRandomIntInclusive(1, 2)
    let comment = ''

    for (let i = 0; i < numOfWords; i++) {
        const randomIndex = getRandomIntInclusive(0, words.length - 1)
        comment += words[randomIndex] + ' '
    }

    comment = comment.trim()
    return comment
}


function _getRandomActivityGroup(board) {
    const groups = board.groups
    const randGroup = groups[getRandomIntInclusive(0, groups.length - 1)]
    // const activityGroup = {
    //     id: randGroup.id,
    //     title: randGroup.title
    // }
    return randGroup
}

function _getRandomActivityMember(board) {
    const members = board.members
    return members[getRandomIntInclusive(0, members.length - 1)]
}

function _getRandomActivityTitle() {
    const activities = ['add task', 'change cover', 'add comment']
    return activities[getRandomIntInclusive(0, activities.length - 1)]
}

function _getRandomGroups(board) {
    const length = getRandomIntInclusive(4, 6)
    const groups = []
    for (let i = 0; i < length; i++) {
        const group = _getRandomGroup(board)
        groups.push(group)
    }
    return groups
}

function _getRandomGroup(board) {
    const group = {
        id: 'g' + makeId(),
        title: getRandomGroupTitle(),
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? _getRandomTimestamp() : null,
        tasks:_getRandomTasks(board),
        style: getRandomIntInclusive(1, 3) === 1 ? { backgroundColor: getRandomColor() } : null
    }
    return group
}

function getRandomGroupTitle() {
    const groupTitles = [
        "To Do",
        "In Progress",
        "Completed",
        "Backlog",
        "Upcoming Tasks",
        "Urgent",
        "Ideas",
        "On Hold",
        "Review",
        "Research",
        "High Priority",
        "Low Priority",
        "Waiting for Approval",
        "Needs Clarification",
        "Resources",
        "Brainstorming",
        "Daily Tasks",
        "Weekly Goals",
        "Monthly Goals",
        "Team Feedback",
        "Milestones",
        "Personal Tasks",
        "Work Tasks",
        "Done",
        "Client Requests",
        "Bug Tracking",
        "Sprint Planning",
        "QA Testing",
        "Product Launch",
        "Follow Up"
    ]

    const randomIndex = Math.floor(Math.random() * groupTitles.length)
    return groupTitles[randomIndex]
}

function _getRandomTasks(board) {
    const length = getRandomIntInclusive(0, 20)
    const tasks = []
    for (let i = 0; i < length; i++) {
        tasks.push(_getRandomTask(board))
    }
    return tasks
}

function _getRandomTask(board) {
    const task = {
        id: 't' + makeId(),
        title: getRandomIntInclusive(1, 4) > 1 ? _getRandomTaskName() : '',
        isDone: _getRandomTaskIsDone(),
        priority: getRandomIntInclusive(1, 4) > 1 ? _getRandomPriority() : null,
        dueDate: getRandomIntInclusive(1, 4) > 1 ? _getRandomDueDate() : null,
        description: _getRandomTaskDescription(),
        checklists: getRandomIntInclusive(1, 4) > 1 ? _getRandomChecklists() : [],
        membersIds: _getRandomTaskMembersIds(board),
        labelsIds: _getRandomTaskLabels(board),
        byMember: _getRandomTaskMember(board),
        style: getRandomTaskStyle(),
        attachments: getRandomIntInclusive(1, 4) > 1 ? [] : _getRandomAttachments()
    }
    return task
}

function _getRandomAttachments() {
    const demoAttachments = [
        {
            title: "openart-image_NCjT4BO6_1721211304700_raw.jpg",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721739547/jypeggdpogvfaoz0xbn6.jpg",
            createdAt: 1721739548198,
            type: "image/jpeg",
            backgroundColor:  _rgb(229, 229, 226)
        },
        {
            title: "openart-image_R3VI1CMG_1721209766848_raw.jpg",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721739549/ldob56coyk2vn088sjci.jpg",
            createdAt: 1721739549873,
            type: "image/jpeg",
            backgroundColor: _rgb(63, 67, 50)
        },
        {
            title: "BDGD.jpeg",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721739602/wrmgxooponh1kdk3fx8y.jpg",
            createdAt: 1721739603540,
            type: "image/jpeg",
            backgroundColor: _rgb(245, 246, 245)
        },
        {
            title: "e0f3495a4bd023d4f9e45715f6a64099b6-harris-lede.rvertical.w600.webp",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721740532/pjogbkebvzk8pl2xzat3.webp",
            createdAt: 1721740532640,
            type: "image/webp",
            backgroundColor: _rgb(72, 61, 50)
        },
        {
            title: "images.jpeg",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721740543/u3e9okwefql3ys33wdbh.jpg",
            createdAt: 1721740544374,
            type: "image/jpeg",
            backgroundColor: _rgb(61, 78, 57)
        },
        {
            title: "the-matrix-code-keanu-reeves.avif",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721740556/nkzneerrwqileytdawtt.avif",
            createdAt: 1721740557093,
            type: "image/avif",
            backgroundColor: _rgb(81, 93, 62)
        },
        {
            title: "matrix2.jpeg",
            url: "http://res.cloudinary.com/dw5vg4xiv/image/upload/v1721740577/o1w139lb4812tmd97ukm.jpg",
            createdAt: 1721740578511,
            type: "image/jpeg",
            backgroundColor: _rgb(63, 67, 50)
        }
    ]
    const length = getRandomIntInclusive(1,3)
    const attachments = []
    for (let i = 0; i<length; i++){
        const attachment = {...demoAttachments.splice(getRandomIntInclusive(0,demoAttachments.length-1),1)[0]}
        attachments.push(attachment)
    }
    return attachments
}

function _rgb(r, g, b) {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getRandomTaskStyle() {
    const randNum = getRandomIntInclusive(1, 3)
    if (randNum > 1) {
        return null
    }
    return { backgroundColor: getRandomColor(), isFull: (getRandomIntInclusive(1, 2) === 1) }
}

function _getRandomTaskMember(board) {
    return board.members[getRandomIntInclusive(0, board.members.length - 1)]
}

function _getRandomTaskLabels(board) {
    const boardLabelids = board.labels.map(label => label.id)
    const taskLabelIds = []
    const length = getRandomIntInclusive(0, 3)
    for (let i = 0; i < length; i++) {
        const id = boardLabelids.splice(getRandomIntInclusive(0, boardLabelids.length - 1), 1)[0]
        taskLabelIds.push(id)
    }
    return taskLabelIds
}

function _getRandomTaskMembersIds(board) {
    const boardMembersIds = board.members.map(member => member._id)
    const taskMembersIds = []
    const length = getRandomIntInclusive(0, 3)
    for (let i = 0; i < length; i++) {
        const id = boardMembersIds.splice(getRandomIntInclusive(0, boardMembersIds.length - 1), 1)[0]
        taskMembersIds.push(id)
    }
    return taskMembersIds
}

function _getRandomChecklists() {
    const length = getRandomIntInclusive(1, 3)
    const checklists = []
    for (let i = 0; i < length; i++) {
        const checklist = _getRandomChecklist()
        checklists.push(checklist)
        break
    }
    return checklists
}

function _getRandomChecklist() {
    return {
        id: 'cl' + makeId(),
        title: _getRandomChecklistTitle(),
        todos: _getRandomTodos(),
    }
}

function _getRandomTodos() {
    const length = getRandomIntInclusive(2, 10)
    const todos = []
    for (let i = 0; i < length; i++) {
        const todo = _getRandomTodo()
        todos.push(todo)
        break
    }
    return todos
}

function _getRandomTodo() {
    return {
        id: 'td' + makeId(),
        title: getRandomTodoTitle(),
        isDone: getRandomIntInclusive(0, 9) < 4 ? true : false
    }
}

function getRandomTodoTitle() {
    const titles = [
        "Finish the financial report",
        "Prepare the client presentation",
        "Update project management software",
        "Review marketing strategy",
        "Schedule team meeting",
        "Research market trends",
        "Organize company event",
        "Write a blog post",
        "Develop new product feature",
        "Conduct customer survey",
        "Send monthly newsletter",
        "Analyze sales data",
        "Draft business proposal",
        "Test software update",
        "Create social media posts",
        "Coordinate design review",
        "Analyze customer feedback",
        "Create marketing plan",
        "Review industry trends",
        "Plan team-building event",
        "Finalize project plan",
        "Develop training program",
        "Compile competitive analysis"
    ];

    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}

function _getRandomChecklistTitle() {
    const titles = [
        "Daily Tasks",
        "Project Milestones",
        "Weekly Goals",
        "Monthly Objectives",
        "Team Meeting Agenda",
        "Client Meeting Preparation",
        "Marketing Campaign Plan",
        "Product Launch Steps",
        "Event Planning Checklist",
        "Website Update Tasks",
        "Sales Target Goals",
        "Budget Review Checklist",
        "Customer Feedback Follow-Up",
        "New Employee Onboarding",
        "Quality Assurance Tasks",
        "Content Creation Plan",
        "Social Media Strategy",
        "Inventory Management",
        "Supplier Coordination",
        "Performance Review Preparation"
    ];

    const randomIndex = Math.floor(Math.random() * titles.length)
    return titles[randomIndex];
}

function _getRandomTaskDescription() {
    const descriptions = [
        "Complete the quarterly financial report",
        "Prepare the presentation for the client meeting",
        "Update the project management software",
        "Review and edit the marketing strategy document",
        "Schedule a team meeting to discuss project milestones",
        "Research new market trends and report findings",
        "Organize the company event for next month",
        "Write a blog post for the company website",
        "Develop a new feature for the product",
        "Conduct a customer satisfaction survey",
        "Prepare and send out the monthly newsletter",
        "Analyze sales data for the last quarter",
        "Draft a proposal for a new business opportunity",
        "Test and debug the latest software update",
        "Create social media content for the upcoming campaign",
        "Coordinate with the design team to finalize the new product layout, ensuring that all feedback is incorporated and design standards are met",
        "Conduct an in-depth analysis of the customer feedback from the recent survey to identify key areas for improvement and actionable insights",
        "Develop a comprehensive marketing plan for the next quarter, including budget allocation, target audience segmentation, and campaign timelines",
        "Review the latest industry trends and compile a detailed report highlighting potential opportunities and threats for the business",
        "Plan and execute a team-building event that fosters collaboration and improves team morale, including all logistics and follow-up activities",
        "Develop a detailed project plan for the upcoming product launch, covering all aspects from initial concept through to final delivery. This plan should include timelines, budget estimates, resource allocation, risk management strategies, and contingency plans to ensure the project stays on track and within budget.",
        "Create a comprehensive employee training program to improve skills and productivity across the organization. This program should include a needs assessment, curriculum development, training materials, scheduling, and a system for evaluating the effectiveness of the training sessions.",
        "Draft a thorough competitive analysis report that evaluates the strengths and weaknesses of our primary competitors. This report should cover market positioning, product offerings, pricing strategies, marketing approaches, customer reviews, and potential threats to our market share. Include actionable recommendations for how we can improve our competitive edge."
    ];

    const randomIndex = Math.floor(Math.random() * descriptions.length)
    return getRandomIntInclusive(1, 10) > 3 ? '' : descriptions[randomIndex]
}

function _getRandomDueDate() {
    const currentDate = new Date()
    const lastWeek = new Date(currentDate)
    lastWeek.setDate(lastWeek.getDate() - 7)

    const nextMonth = new Date(currentDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const randomTimestamp = Math.floor(
        lastWeek.getTime() + Math.random() * (nextMonth.getTime() - lastWeek.getTime())
    )

    return randomTimestamp
}

function _getRandomPriority() {
    const randNum = getRandomIntInclusive(1, 3)
    if (randNum === 1) return 'high'
    if (randNum === 2) return 'medium'
    return 'low'
}

function _getRandomTaskIsDone() {
    const randNum = getRandomIntInclusive(1, 2)
    if (randNum === 1) return false
    return true
}

function _getRandomTaskName() {
    const verbs = ['Implement', 'Debug', 'Optimize', 'Refactor', 'Test', 'Design', 'Review', 'Update']
    const nouns = ['Algorithm', 'Database', 'API', 'UI', 'Module', 'Function', 'Component', 'Framework']

    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

    return `${randomVerb} ${randomNoun}`
}

function _getRandomMembers() {
    const length = getRandomIntInclusive(7, 7)
    const members = []
    for (let i = 0; i < length; i++) {
        const member = getRandomMember()
        members.push(member)
    }
    return members
}

export function getRandomMember() {
    const member = {
        _id: 'u' + makeId(),
        fullname: _getRandomFullName(),
        imgUrl: `../../../src/assets/imgs/user-imgs/user-img${getRandomIntInclusive(1, 3)}.jpg`
    }
    return member
}

function _getRandomLabels() {
    const labels = [
        'Important', 'Easy', 'Critical', 'Simple', 'Urgent', 'Straightforward', 'Essential',
        'Manageable', 'High Priority', 'Basic', 'Vital', 'Effortless', 'Significant',
        'Uncomplicated', 'Crucial', 'Elementary', 'Major', 'Smooth', 'Paramount', 'Clear-Cut',
        'Imperative', 'Plain'
    ]

    // const numLabels = getRandomIntInclusive(0, 7)
    let randomLabels = []

    while (randomLabels.length < 6) {
        const randomIndex = Math.floor(Math.random() * labels.length)
        const label = labels[randomIndex]
        if (!randomLabels.includes(label)) {
            randomLabels.push(label)
        }
    }
    randomLabels = randomLabels.map(label => ({ id: 'l' + makeId(), title: label, color: getRandomColor() }))
    return randomLabels
}

function _getRandomFullName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Isabella']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return `${randomFirstName} ${randomLastName}`
}

function _getRandomTimestamp() {
    const now = new Date()
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())

    const randomTimestamp = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime())

    return Math.floor(randomTimestamp)
}

function _getProjectTitle() {
    const adjectives = ['Innovative', 'Dynamic', 'Advanced', 'Intelligent', 'Sustainable', 'Futuristic', 'Efficient', 'Streamlined']
    const nouns = ['Solution', 'System', 'Platform', 'Framework', 'Application', 'Network', 'Interface', 'Engine']
    const domains = ['AI', 'IoT', 'Blockchain', 'Cloud', 'Data', 'Security', 'Mobile', 'Web']

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]

    return `${randomAdjective} ${randomDomain} ${randomNoun}`
}