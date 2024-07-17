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
        labels: _getRandomLabels(),
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

    }
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

function _getRandomLabels() {
    const length = getRandomIntInclusive(0, 2)
    const labels = []
    for (let i = 0; i < length; i++) {
        while (true) {
            const label = _generateRandomTaskLabel()
            if (!labels.includes(label)) {
                labels.push(label)
                break
            }
        }
    }
    return labels
}

function _generateRandomTaskLabel() {
    const tasks = [
        'Code Review',
        'Bug Fix',
        'Feature Add',
        'Refactor',
        'Testing',
        'Documentation',
        'Design',
        'Meeting',
        'Planning',
        'Deployment'
    ];

    return tasks[Math.floor(Math.random() * tasks.length)];
}

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

