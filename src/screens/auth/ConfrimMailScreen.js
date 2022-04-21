import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '../../components/AppButton'
import { useDispatch } from 'react-redux';

import { useTheme } from '@react-navigation/native';
import { regStage2 } from '../../ServerRequests';
import { setAuth } from '../../store/actions/dataActions';


export const ConfirmMailScreen = ({ navigation, route }) => {
    const { colors } = useTheme()
    const [code, setCode] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const { mail, name, pass } = route.params

    const dispatch = useDispatch()
    const confirmHandler = async () => {
        setIsChecking(true)
        const result = await regStage2(name, mail, pass, code)
        setIsChecking(false)
        if (result !== '0'){
            dispatch(setAuth(result, mail))
        } else {
            alert('Неверный код подтверждения!')
        }
    }

    if (isChecking) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Ionicons name="ios-arrow-back" size={30} color="black" onPress={() => navigation.pop()} />
                        <Text style={styles.title}>Подтверждение</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: 'Inter' }}>Введите код, отправленный на</Text>
                    <Text style={[styles.mailTitle, { color: colors.primary, marginBottom: 50 }]}>{mail}</Text>
                    <TextInput selectionColor={colors.primary} inputStyle={{ letterSpacing: 20 }} maxLength={6} style={styles.input} placeholder='******' keyboardType='number-pad' value={code} onChangeText={setCode} />
                </View>
                <AppButton style={[styles.button, { opacity: code.length === 6 ? 1 : 0.5, backgroundColor: colors.primary }]} onPress={confirmHandler} disabled={code.length !== 6}>
                    <Text style={{ color: '#fff', fontSize: 24 }}>Перейти!</Text>
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
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '80%',
        fontFamily: 'Code',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 24,
        marginVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
    },
    mailTitle: {
        fontSize: 20,
        fontFamily: 'InterBold'
    }
})