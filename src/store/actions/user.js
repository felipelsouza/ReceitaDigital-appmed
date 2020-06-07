import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'

export const login = userCpf => {
    return {
        type: USER_LOGGED_IN,
        payload: userCpf
    }
}

export const logout = () => {
    return { 
        type: USER_LOGGED_OUT
    }
}