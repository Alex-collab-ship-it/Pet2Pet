import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '../../components/AppButton';
import { setAuth } from '../../store/actions/dataActions';
import { useTheme } from '@react-navigation/native';
import { SignIn } from '../../ServerRequests';


export const SignInScreen = ({ navigation, route }) => {
    const { colors } = useTheme()
    const { mail } = route.params
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()
    const [isChecking, setIsChecking] = useState(false)
    
    const authHandler = async () => {
        setIsChecking(true)
        const result = await SignIn(mail, pass)
        setIsChecking(false)
        if (result !== '0') {
            dispatch(setAuth(result))
        } else {
            alert('Неверныый пароль')
        } 
    }

    if (isChecking) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color={colors.primary} /></View>
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

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
        </TouchableWithoutFeedback>
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