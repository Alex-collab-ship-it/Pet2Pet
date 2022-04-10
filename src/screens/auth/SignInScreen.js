import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '../../components/AppButton';
import { setAuth } from '../../store/actions/dataActions';
import { useTheme } from '@react-navigation/native';

var sha1 = require('sha1');

export const SignInScreen = ({ navigation, route }) => {
    const { colors } = useTheme()
    const { mail } = route.params
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()
    
    const authHandler = () => {
        fetch('https://pancake69.xyz/Auth/Auth',
        {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: mail,
                password: sha1(pass)
            })
        }).then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.text() + ')'
                ));
            }
            return response.text();
        }).then(data => {
            if (data !== '0') {
                dispatch(setAuth('token', data))
            } else {
                alert('Неверныый пароль')
            }   

        })
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="ios-arrow-back" size={30} color="black" onPress={() => navigation.pop()} />
                    <Text style={styles.title}>Авторизация</Text>
                </View>
                <TextInput selectionColor={colors.primary} style={styles.input} onChangeText={setPass} placeholder='Введите ваш пароль' />
            </View>
            <AppButton style={[styles.button, { backgroundColor: colors.primary }]} onPress={authHandler}>
                <Text style={{ color: '#fff', fontSize: 24 }}>Продолжить!</Text>
            </AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '100%',
        fontFamily: 'Inter',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        fontSize: 24,
        marginVertical: 10
    },
    title: {
        fontSize: 24,
        fontFamily: 'InterBold',
        marginLeft: 20
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})