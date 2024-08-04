import { makeId } from "../../services/util.service"
import { loadBoard, updateBoard } from "./board.actions"

export async function updateGroup(groupId, updatedGroup, board, activityTitle = '', user) {
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
                group: { ...updatedGroup },
                task: null,
                createdAt: Date.now()
            }
            activities.push(activity)
            updatedBoard = { ...updatedBoard, activities }
        }



        const savedBoard = await updateBoard(updatedBoard)
        return savedBoard
    } catch (err) {
        console.error('Failed to update group:', err)
        throw err
    }
}