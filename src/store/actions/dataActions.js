import { LOAD_STATUS, SET_THEME, SET_AUTH } from "../types"
import * as SecureStore from 'expo-secure-store';



export const getAuth = () => async dispatch => {
    const user = await SecureStore.getItemAsync('token');
    dispatch({
        type: LOAD_STATUS,
        payload: {
            userToken: user,
            isSigned: user === null || user === '' ? false : true
        }
    })
}

export const setAuth = (value) => async dispatch => {
    await SecureStore.setItemAsync('token', value)
    dispatch({
        type: SET_AUTH,
        payload: {
            userToken: value,
            isSigned: value === '' || value === null ? false : true
        }
    })
}



export const setTheme = (value) => async dispatch => {
    await SecureStore.setItemAsync('theme', value);
    dispatch({
        type: SET_THEME,
        payload: value
    })
}


export const getPets = () => async dispatch => {
    // await SecureStore.setItemAsync('theme', value);
    // dispatch({
    //     type: SET_THEME,
    //     payload: value
    // })
}

