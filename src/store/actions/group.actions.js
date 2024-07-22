import { loadBoard, updateBoard } from "./board.actions"

export async function updateGroup(groupId, updatedGroup, board) {
    try {
        let updatedBoard

        if (groupId) {
            // Updating an existing group (adding a task)
            updatedBoard = {
                ...board,
                groups: board.groups.map(g => g.id === groupId ? updatedGroup : g)
            }
        } else {
            // Adding a new group
            updatedBoard = {
                ...board,
                groups: [...board.groups, updatedGroup]
            }
        }

        const savedBoard = await updateBoard(updatedBoard)
        console.log(savedBoard)
        return savedBoard
    } catch (err) {
        console.error('Failed to update group:', err)
        throw err
    }
}