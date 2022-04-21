import { useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import { Dialog } from '../../components/ui/Dialog'
import { Separator } from '../../components/Separator'
import { THEME } from '../../theme'
import AppLoading from 'expo-app-loading'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllChats } from '../../store/actions/dataActions'

export const LikesScreen = ({ navigation, route }) => {
    const { token } = route.params
    const [ data, setData ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)
    const { colors } = useTheme()

    const loadData = async () => {
        let result = await fetch('https://pancake69.xyz/Matchs/LoadAll', {
            method: 'POST',
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: "\"" + token + "\""
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
            return response.json();
        }).then(res => res).catch((error) => {
            console.log(error)
        });
        setIsLoaded(true)
        setData(result)
    }
    
    
    if (!isLoaded) {
        return <AppLoading startAsync={loadData} onFinish={() => setIsLoaded(true)} onError={err => console.log(err)}/>
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 22, fontFamily: 'InterBold' }}>Диалоги</Text>
            <FlatList ItemSeparatorComponent={() => <Separator />}
                ListEmptyComponent={() => <Text style={{ alignSelf: 'center', marginTop: 20 }}>Пока нет взаимных симпатий ;(</Text>}
                style={styles.list} data={data} renderItem={({ item, index }) => <Dialog
                    key={index}
                    pet={item}
                    token={token}
                    onPress={() => navigation.navigate('Chat', { pet: item })}
                    />

            } />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    list: {
        width: THEME.WIDTH,
        marginVertical: 20,
    }
})