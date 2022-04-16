import { useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'

export const LikesScreen = ({ navigation, route }) => {
    const { token } = route.params
    console.log(token)
    const [data, setdata] = useState(false)
    const { colors } = useTheme()

    useEffect(() => 
        checkForUpdates()
    )
    const checkForUpdates = async () => {
        // let result = await fetch('',{
        //     method: 'POST',
        //     headers:{
        //         'Accept': 'text/plain',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: "\"" + token + "\""
        // })
        // })
    }

    if (!data) {
        return <View style={styles.container}><ActivityIndicator style={{ alignSelf: 'center' }} size="large" color={colors.primary} /></View>
    }


    return (
        <SafeAreaView style={styles.container}>
            { data.length > 0 ? (<FlatList />) : (
                <Text>Пока нет ваимный симпатий ;(</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {

    }
})