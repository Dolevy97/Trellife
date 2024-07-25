import { userService } from '../../services/user'
// import { socketService } from '../../services/socket.service'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS } from '../reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function updateUser(user) {
    store.dispatch({
        type: SET_USER,
        user
    })
    try {
        const updatedUser = await userService.update(user)
        store.dispatch({
            type: SET_USER,
            user: updatedUser
        })
        return updatedUser
    } catch (err) {
        console.log('Cannot update', err)
        store.dispatch({
            type: SET_USER,
            user: store.getState().user
        })
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function guestLogin() {
    const guest = {
        _id: '',
        fullname: 'Guest',
        imgUrl: 'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg'
    }
    store.dispatch({ type: SET_USER, user: guest })
}
