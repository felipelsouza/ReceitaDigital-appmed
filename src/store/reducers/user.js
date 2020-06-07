import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes'

const initialState = {
    userCpf: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                userCpf: action.payload.userCpf
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                userCpf: null,
            }
        default:
            return state
    }
}

export default reducer