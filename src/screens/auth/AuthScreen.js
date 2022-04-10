import { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Checkbox from 'expo-checkbox';

import { AppButton } from '../../components/AppButton';
import { useTheme } from '@react-navigation/native';

export const AuthScreen = ({ navigation }) => {
    const { colors } = useTheme()
    
    const checkHandler = async () => {
        if (mail === '' || mail.search(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i)) { alert('Неверный формат почты'); return }
        await fetch('https://pancake69.xyz/Auth/AuthCheck',
        {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: "\"" + mail + "\""
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.text() + ')'
                ));
            }
            return response.text();
        }).then((data) => {
            if (data === '1'){ navigation.navigate('SignIn', { mail: mail }) }
            else if (data === '0') {
                navigation.navigate('SignUp', { mail: mail })
            }
        }).catch((error) => {
            console.log(error)
        });
    }




    const [mail, setMail] = useState('')
    const [isChecked, setChecked] = useState(true)
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Начнём с авторизации</Text>
                    
                    <TextInput selectionColor={colors.primary} importantForAutofill='no' style={styles.input} textContentType='emailAddress' keyboardType='email-address' onChangeText={setMail}
                        value={mail} placeholder='example@mail.ru' />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox style={{ margin: 8, borderRadius: 5 }} value={isChecked} onValueChange={setChecked} color={isChecked ? colors.primary : undefined} />
                        <Text style={[ styles.agreementTitle, { color: 'black' }]}>Я прочитал </Text>
                        <Text style={[ styles.agreementTitle, { color: colors.primary }]}>политику конфидециальности</Text>
                    </View>
                </View>
                <AppButton style={[styles.button, { backgroundColor: colors.primary,  opacity: !isChecked || mail === '' || mail.search(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i) ? 0.5 : 1 }]} onPress={checkHandler}>
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