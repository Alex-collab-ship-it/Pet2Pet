import { LOAD_STATUS, SET_THEME, SET_AUTH, LOAD_NEW_CHATS } from "../types"
import * as SecureStore from 'expo-secure-store';
import { DB } from "../../db";



export const getAuth = () => async dispatch => {
    const token = await SecureStore.getItemAsync('token');
    const mail = await SecureStore.getItemAsync('mail');
    dispatch({
        type: LOAD_STATUS,
        payload: {
            userMail: mail,
            userToken: token,
            isSigned: token === null || token === '' ? false : true
        }
    })
}

export const setAuth = (token, mail) => async dispatch => {
    await SecureStore.setItemAsync('token', token)
    await SecureStore.setItemAsync('mail', mail)
    dispatch({
        type: SET_AUTH,
        payload: {
            userMail: mail,
            userToken: token,
            isSigned: token === '' || token === null ? false : true
        }
    })
}

export const loadAllChats = (token) => async dispatch => {
    while (true) {
        await fetch('https://pancake69.xyz/Messenger/GetNewMessages',{
            method: 'POST',
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: "\"" + token + "\""
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.text() + ')'
                ));
            }
            return response.json()
        }
        ).then(data => {
            if (data.length>0) {
                data.forEach(msg => {
                    if (msg.type === "Text") {
                        DB.addMsgText(msg.toUser, msg.fromUser, msg.content, msg.dataStatus)
                    }
                });
                dispatch({
                    type: LOAD_NEW_CHATS,
                    payload: data
                })
            }
        })
        await wait(200)
    }
}



export const setTheme = (value) => async dispatch => {
    await SecureStore.setItemAsync('theme', value);
    dispatch({
        type: SET_THEME,
        payload: value
    })
}


const wait = timeout => {
    return new Promise(resolve => {setTimeout(resolve, timeout)});
  }