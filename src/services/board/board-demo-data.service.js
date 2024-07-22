import { getRandomColor, getRandomIntInclusive, getRandomTimestamp, makeId } from "../util.service";


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
            background: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        },
        labels: _getRandomLabels(),
        members: _getRandomMembers(),
    }
    board.groups = _getRandomGroups(board)
    board.activities = _getRandomActivities(board)
    return board
}

function _getRandomActivities(board) {
    const length = getRandomIntInclusive(10, 50)
    const activities = []
    for (let i = 0; i < length; i++) {
        const activity = _getRandomActivity(board)
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
        // task: _getRandomActivityTask(board)
    }

    activity.task = _getRandomActivityTask(activity.group)
    if (activity.title === 'add comment') activity.txt = _getRandomComment()
    activity.group = { id: activity.group.id, title: activity.group.title }
    activity.createdAt = getRandomTimestamp()
    return activity
}

function _getRandomActivityTask(group) {
    const tasks = group.tasks
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
    const length = getRandomIntInclusive(2, 10)
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
        title: 'List ' + getRandomIntInclusive(1, 99),
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? _getRandomTimestamp() : null,
        tasks: _getRandomTasks(board),
        style: {}
    }
    return group
}

function _getRandomTasks(board) {
    const length = getRandomIntInclusive(2, 20)
    const tasks = []
    for (let i = 0; i < length; i++) {
        tasks.push(_getRandomTask(board))
    }
    return tasks
}

function _getRandomTask(board) {
    const task = {
        id: 't' + makeId(),
        title: _getRandomTaskName(),
        isDone: _getRandomTaskIsDone(),
        priority: _getRandomPriority(),
        dueDate: _getRandomDueDate(),
        description: _getRandomTaskDescription(),
        checklists: _getRandomChecklists(),
        membersIds: _getRandomTaskMembersIds(board),
        labelsIds: _getRandomTaskLabels(board),
        byMember: _getRandomTaskMember(board),
        style: getRandomTaskStyle(),
        attachments: []
    }
    return task
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
    const length = getRandomIntInclusive(4, 10)
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

    const randomIndex = Math.floor(Math.random() * titles.length);
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

    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return getRandomIntInclusive(1, 10) > 3 ? '' : descriptions[randomIndex];
}

function _getRandomDueDate() {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const randomTimestamp = Math.floor(
        lastWeek.getTime() + Math.random() * (nextMonth.getTime() - lastWeek.getTime())
    );

    return randomTimestamp;
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
    const verbs = ['Implement', 'Debug', 'Optimize', 'Refactor', 'Test', 'Design', 'Review', 'Update'];
    const nouns = ['Algorithm', 'Database', 'API', 'UI', 'Module', 'Function', 'Component', 'Framework'];

    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomVerb} ${randomNoun}`;
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
    ];

    // const numLabels = getRandomIntInclusive(0, 7)
    let randomLabels = [];

    while (randomLabels.length < 6) {
        const randomIndex = Math.floor(Math.random() * labels.length);
        const label = labels[randomIndex];
        if (!randomLabels.includes(label)) {
            randomLabels.push(label);
        }
    }
    randomLabels = randomLabels.map(label => ({ id: 'l' + makeId(), title: label, color: getRandomColor() }))
    return randomLabels;
}

function _getRandomFullName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function _getRandomTimestamp() {
    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

    const randomTimestamp = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime());

    return Math.floor(randomTimestamp);
}

function _getProjectTitle() {
    const adjectives = ['Innovative', 'Dynamic', 'Advanced', 'Intelligent', 'Sustainable', 'Futuristic', 'Efficient', 'Streamlined'];
    const nouns = ['Solution', 'System', 'Platform', 'Framework', 'Application', 'Network', 'Interface', 'Engine'];
    const domains = ['AI', 'IoT', 'Blockchain', 'Cloud', 'Data', 'Security', 'Mobile', 'Web'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    return `${randomAdjective} ${randomDomain} ${randomNoun}`;
}