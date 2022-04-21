import { LOAD_STATUS, SET_THEME, SET_AUTH, LOAD_NEW_CHATS, CLEAR_NEW_CHATS } from "../types"

const initialState = {
    loading: true,
    userToken: null,
    userMail: null,
    isSigned: false,
    chats: []
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
        case LOAD_NEW_CHATS:
            return {
                ...state,
                chats: [...state.chats, ...action.payload],
                loading: false
            }
        case CLEAR_NEW_CHATS:
            return {
                ...state,
                chats: [],
                loading: false
            }
        default:
            return state
        
    }
}