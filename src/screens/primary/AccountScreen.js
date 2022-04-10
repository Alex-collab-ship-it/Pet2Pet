import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'
import { AppButton } from '../../components/AppButton'
import { setAuth } from '../../store/actions/dataActions'

export const AccountScreen = () => {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(setAuth('token',''))
    }
    return (
        <SafeAreaView style={styles.container}>
            <AppButton onPress={logoutHandler} style={styles.button}>
                <Text style={styles.logoutTitle}>Выйти</Text>
            </AppButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 14
    },
    logoutTitle: {
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 24
    }
})