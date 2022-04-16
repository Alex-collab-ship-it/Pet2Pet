import { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import Checkbox from 'expo-checkbox';

import { AppButton } from '../../components/AppButton';
import { useTheme } from '@react-navigation/native';
import { reg_check } from '../../ServerRequests';


export const AuthScreen = ({ navigation }) => {
    const { colors } = useTheme()
    const [mail, setMail] = useState('')
    const [isAgree, setIsAgree] = useState(true)
    const [isChecking, setIsChecking] = useState(false)

    const checkHandler = async () => {
        if (mail === '' || mail.search(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i)) { alert('Неверный формат почты'); return }
        setIsChecking(true)
        const result = await reg_check(mail) 
        setIsChecking(false)
        if (result === '1'){ navigation.navigate('SignIn', { mail: mail }) }
        else if (result === '0') {
            navigation.navigate('SignUp', { mail: mail })
        }
    }

    if (isChecking) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color={colors.primary} /></View>
    }



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Начнём с авторизации</Text>
                    
                    <TextInput selectionColor={colors.primary} importantForAutofill='no' style={styles.input} textContentType='emailAddress' keyboardType='email-address' onChangeText={setMail}
                        value={mail} placeholder='example@mail.ru' />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox style={{ margin: 8, borderRadius: 5 }} value={isAgree} onValueChange={setIsAgree} color={isAgree ? colors.primary : undefined} />
                        <Text style={[ styles.agreementTitle, { color: 'black' }]}>Я прочитал </Text>
                        <Text style={[ styles.agreementTitle, { color: colors.primary }]}>политику конфидециальности</Text>
                    </View>
                </View>
                <AppButton disabled={!isAgree || mail === ''} style={[styles.button, { backgroundColor: colors.primary,  opacity: !isAgree || mail === '' ? 0.5 : 1 }]}
                    onPress={checkHandler}>
                    <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'Inter' }}>Продолжить!</Text>
                </AppButton>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    wrapper: {
        flex: 1,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '100%',
        fontFamily: 'InterRegular',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 24,
        marginVertical: 10,

    },
    title: {
        fontSize: 24,
        fontFamily: 'InterBold',

    },
    agreementTitle: {
        fontSize: 12,
        fontFamily: 'InterRegular'
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})