import { LOAD_STATUS, LOGOUT, SET_THEME, SIGN_UP } from "../types"
import * as SecureStore from 'expo-secure-store';


export const loadStatus = (key) => async dispatch => {
    const data = await SecureStore.getItemAsync(key);
    const result = {
        userToken: data,
        isSigned: data === null || data === '' ? false : true
    }
    dispatch({
        type: LOAD_STATUS,
        payload: result
    })
}

export const setAuth = (key, value) => async dispatch => {
    await SecureStore.setItemAsync(key, value);
    const result = {
        userToken: value,
        isSigned: value === null || value === '' ? false : true
    }
    dispatch({
        type: value === '' ? LOGOUT : SIGN_UP,
        payload: result
    })
}

export const setTheme = (value) => async dispatch => {
    await SecureStore.setItemAsync('theme', value);
    dispatch({
        type: SET_THEME,
        payload: value
    })
}

