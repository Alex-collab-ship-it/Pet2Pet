import { LOAD_STATUS, LOGOUT, SET_THEME, SIGN_UP } from "../types"

const initialState = {
    loading: true,
    userToken: null,
    isSigned: false
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STATUS:
            return {...state,
                ...action.payload,
                loading: false
            }
        case SIGN_UP: 
            return {
                ...state, 
                ...action.payload,
                loading: false
            }
        case LOGOUT: 
            return {
                ...state, 
                ...action.payload,
                loading: false
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.payload,
                loading: false
            }
        default:
            return state
        
    }
}