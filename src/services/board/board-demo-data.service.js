import { getRandomIntInclusive, makeId } from "../util.service";


export const boardDemoDataService = {
    createDemoBoards
}

function _createDemoBoard() {
    const board = {
        _id: makeId(),
        title: _generateProjectTitle(),
        isStarred: getRandomIntInclusive(0, 9) < 3 ? true : false,
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? _generateRandomTimestamp() : null,
        createdBy: _generateRandomMember(),
        style: {
            backgroundImage: '',
        },
        labels: _generateRandomLabels(),
        members: _getRandomMembers(),
        groups: _getRandomGroups(),
    }
}

function _getRandomGroups() {
    const length = getRandomIntInclusive(2, 10)
    const groups = []
    for (let i = 0; i < length; i++) {
        const group = _getRandomGroup()
        groups.push(group)
        break
    }
    return groups
}

function _getRandomGroup() {
    const group = {
        id: 'g' + makeId(),
        title: 'Group' + getRandomIntInclusive(1, 99),
        archivedAt: getRandomIntInclusive(0, 9) < 3 ? _generateRandomTimestamp() : null,
        tasks: _generateRandomTasks(),

    }
}

function _generateRandomTasks() {
    const length = getRandomIntInclusive(2, 20)
    const tasks = []
    for (let i = 0; i < length; i++) {
        tasks.push(_generateRandomTask())
    }
    return tasks
}

function _generateRandomTask() {
    return {
        id: 't' + makeId(),
        title: _generateRandomTaskName(),
        status: _getRandomTaskStatus(),
        priority: _getRandomPriority(),
        dueDate: _getRandomDueDate(),
        description: _getRandomTaskDescription(),
        
    }
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
    return descriptions[randomIndex];
}

// Example usage
console.log(getRandomTaskDescription());

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

// Example usage
console.log(getRandomDueDate());

function _getRandomPriority(){
    const randNum = getRandomIntInclusive(1, 3)
    if (randNum === 1) return 'high'
    if (randNum === 2) return 'medium'
    return 'low'
}

function _getRandomTaskStatus() {
    const randNum = getRandomIntInclusive(1, 3)
    if (randNum === 1) return 'toDo'
    if (randNum === 2) return 'inProgress'
    return 'done'
}

function _generateRandomTaskName() {
    const verbs = ['Implement', 'Debug', 'Optimize', 'Refactor', 'Test', 'Design', 'Review', 'Update'];
    const nouns = ['Algorithm', 'Database', 'API', 'UI', 'Module', 'Function', 'Component', 'Framework'];

    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomVerb} ${randomNoun}`;
}

function _getRandomMembers() {
    const length = getRandomIntInclusive(2, 10)
    const members = []
    for (let i = 0; i < length; i++) {
        const member = _generateRandomMember()
        members.push(member)
        break
    }
    return members
}

function _generateRandomMember() {
    const member = {
        _id: 'u' + makeId(),
        fullname: _generateRandomFullName(),
        imgUrl: ''
    }
    return member
}

function _generateRandomLabels() {
    const labels = [
        'Important', 'Easy', 'Critical', 'Simple', 'Urgent', 'Straightforward', 'Essential',
        'Manageable', 'High Priority', 'Basic', 'Vital', 'Effortless', 'Significant',
        'Uncomplicated', 'Crucial', 'Elementary', 'Major', 'Smooth', 'Paramount', 'Clear-Cut',
        'Imperative', 'Plain'
    ];

    const numLabels = Math.floor(Math.random() * 9) + 2; // Generates a number between 2 and 10
    const randomLabels = [];

    while (randomLabels.length < numLabels) {
        const randomIndex = Math.floor(Math.random() * labels.length);
        const label = labels[randomIndex];
        if (!randomLabels.includes(label)) {
            randomLabels.push(label);
        }
    }

    return randomLabels;
}

// // Example usage
// console.log(generateRandomLabels());

// function _getRandomLabel() {
//     const labels = [
//         'Code Review',
//         'Bug Fix',
//         'Feature Add',
//         'Refactor',
//         'Testing',
//         'Documentation',
//         'Design',
//         'Meeting',
//         'Planning',
//         'Deployment'
//     ];

//     return labels[Math.floor(Math.random() * labels.length)];
// }

function _generateRandomFullName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function _generateRandomTimestamp() {
    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

    const randomTimestamp = new Date(
        twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime())
    );

    return randomTimestamp;
}



function _generateProjectTitle() {
    const adjectives = ['Innovative', 'Dynamic', 'Advanced', 'Intelligent', 'Sustainable', 'Futuristic', 'Efficient', 'Streamlined'];
    const nouns = ['Solution', 'System', 'Platform', 'Framework', 'Application', 'Network', 'Interface', 'Engine'];
    const domains = ['AI', 'IoT', 'Blockchain', 'Cloud', 'Data', 'Security', 'Mobile', 'Web'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    return `${randomAdjective} ${randomDomain} ${randomNoun}`;
}

