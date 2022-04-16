import { LOAD_STATUS, SET_THEME, SET_AUTH } from "../types"

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
        case SET_AUTH: 
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