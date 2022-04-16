import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { AppButton } from '../../components/AppButton';
import { regStage1 } from '../../ServerRequests';

export const SignUpScreen = ({ navigation, route }) => {

    const { colors } = useTheme()

    const { mail } = route.params
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [isChecking, setIsChecking] = useState(false)

    const handler = async () => {
        setIsChecking(true)
        await regStage1(mail)
        setIsChecking(false)
        navigation.navigate('ConfirmMail', { name: name, mail: mail, pass: pass })
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
                        <Text style={styles.title}>Регистрация</Text>
                    </View>
                    <TextInput selectionColor={colors.primary} style={styles.input} onChangeText={setName} placeholder='Ваше имя' />
                    <TextInput selectionColor={colors.primary} style={styles.input} onChangeText={setPass} placeholder='Введите ваш пароль' />
                </View>
                <AppButton style={[styles.button, { opacity: pass === '' || name === '' ? 0.5 : 1, backgroundColor: colors.primary }]} disabled={pass === '' || name === ''}
                    onPress={handler}>
                    <Text style={{ color: '#fff', fontSize: 24 }}>Продолжить!</Text>
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
        justifyContent: 'space-between'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '100%',
        fontFamily: 'Inter',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 24,
        marginVertical: 10
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: 'InterBold',
        marginLeft: 20
    },
})