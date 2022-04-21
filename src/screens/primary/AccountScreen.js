import { useTheme } from '@react-navigation/native'
import { Text, StyleSheet, SafeAreaView } from 'react-native'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'

import { AppButton } from '../../components/AppButton'
import { getAuth, setAuth } from '../../store/actions/dataActions'
import { useEffect, useState } from 'react';
import { getPet } from '../../ServerRequests';

export const AccountScreen = ({ navigation, route }) => {
    const { token } = route.params
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const [ hasPets, setHasPets ] = useState(true)

    useEffect(async () => {
        const result = await getPet(token)
        if (result.id === -1){
            navigation.navigate('CreatePetModal', { closable: false, photos: []  })
        } else {
            setHasPets(true)
        }
    }, [])

    const logoutHandler = () => {
        dispatch(setAuth('', ''))
    }
    return (
        <SafeAreaView style={styles.container}>
            <AppButton onPress={logoutHandler}>
                <SimpleLineIcons name="logout" size={24} color={colors.red} />
            </AppButton>
            { !hasPets && (
            <AppButton onPress={() => navigation.navigate('CreatePetModal', { closable: true, photos: [] })} style={{ flexDirection: 'row' }}>
                <Text style={[styles.addTitle, { color: colors.primary }]}>Добавить животное</Text>
                <MaterialIcons name="pets" size={24} color={colors.primary}/>
            </AppButton>
            ) }
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
    addTitle: {
        fontFamily: 'Inter',
        fontSize: 18
    }
})