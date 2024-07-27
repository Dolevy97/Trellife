import { loadBoard, updateBoard } from "./board.actions"

export async function updateGroup(groupId, updatedGroup, board,activityTitle='') {
    try {
        let updatedBoard

        if (groupId) {
            updatedBoard = {
                ...board,
                groups: board.groups.map(g => g.id === groupId ? updatedGroup : g)
            }
        } else {
            updatedBoard = {
                ...board,
                groups: [...board.groups, updatedGroup]
            }
        }

        let activities = [...board.activities]
        if (activityTitle) {
            const activity = {
                id: 'a' + makeId(),
                title: activityTitle,
                byMember: user,
                // FOR LOCAL:
                // byMember: getRandomMember(),
                group: { ...group },
                task: null,
                createdAt: Date.now()
            }
            activities.push(activity)
            updatedBoard = { ...updatedBoard, groups, activities }
        }

    

        const savedBoard = await updateBoard(updatedBoard)
        // console.log(savedBoard)
        return savedBoard
    } catch (err) {
        console.error('Failed to update group:', err)
        throw err
    }
}