import { useTheme } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView, View, TextInput,
    StyleSheet, FlatList, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { sendMessage } from '../../ServerRequests';
import { DB } from '../../db'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_NEW_CHATS } from '../../store/types';
import { THEME } from '../../theme';

export const ChatScreen = ({ navigation, route }) => {
    const { colors } = useTheme()
    const [ msg , setMsg ] = useState('')
    const [ messages, setMessages ] = useState([])
    const { pet, token, mail } = route.params
    const scrollRef = useRef()

    const sendHandler = async () => {
        setMsg(msg.trim())
        if (msg === '') {
            alert('Пустое сообщение!')
        }
        const result = await sendMessage(token, pet.owner, msg)
        await DB.addSelfMsgText(mail, pet.owner, msg, result)
        const data = await DB.getMessages(pet.owner)
        setMessages(data)
        setMsg('')
    }

    useEffect(async () => {
        const data = await DB.getMessages(pet.owner)
        setMessages(data)
        console.log(1)
        dispatch({ type: CLEAR_NEW_CHATS })
    }, [])


    const dispatch = useDispatch()

    // Keyboard.addListener('keyboardWillShow', () => scrollRef.current.scrollToEnd() )

    const newData = useSelector(state => {
        let res = []
        if (state.data.chats.length > 0) {
            console.log(111)
            console.log(state.data.chats)
            state.data.chats.forEach(m => {
                if (m.fromUser === pet.owner || m.toUser === pet.owner) {
                    res.push(m)
                }
            });
        }
        return res
    })

    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            <ChatHeader pet={pet} onPress={() => navigation.pop()} />
            <FlatList
                fadingEdgeLength={0}
                scrollRef
                showsVerticalScrollIndicator={false}
                inverted
                style={styles.list} data={[...messages, ...newData].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <Message item={item} mail={mail} />} />
            <View style={styles.sendWrapper}>
                <TextInput value={msg} onChangeText={setMsg} selectionColor={colors.primary} style={styles.input} placeholder='Сообщение...' />
                <View style={{ width: '8%' }}>
                    <Ionicons name="md-send" size={28} color={colors.primary} style={{ alignSelf: 'center' }} onPress={sendHandler} />
                </View>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

const ChatHeader = ({pet, onPress}) => {
    return (
        <View style={styles.headerContainer}>
            <Ionicons name="ios-arrow-back" size={30} color="black" onPress={onPress} />
            <Text style={styles.headerTitle}>{pet.name + ', ' + pet.age + ', ' + pet.breed}</Text>
        </View>
    )
}

const Message = ({item, mail}) => {
    return (
        <View style={{ width: '100%', alignItems: item.fromUser === mail ? 'flex-end' : 'flex-start', marginVertical: 5, paddingHorizontal: 15 }}>
            <View style={[styles.msgWrapper, { backgroundColor: item.fromUser === mail ? '#ddd': '#fff' }]}>
                <Text style={styles.msgText}>{item.content}</Text>
                <Text style={styles.msgDate}>{item.dataStatus.substring(12,17)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'space-between',
    },
    sendWrapper: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '92%',
        fontFamily: 'InterRegular',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        fontSize: 18,
        marginVertical: 10,
        backgroundColor: '#456'
    },
    headerContainer: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#456',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    headerTitle: {
        fontSize: 19,
        marginLeft: 10,
        fontFamily: 'Inter'
    },
    msgWrapper: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 12,
        position: 'relative',
    },
    msgText: {
        fontSize: 14,
        fontFamily: 'InterRegular',
        marginBottom: 10,
        marginRight: 12,
        color: '#000'
    },
    msgDate: {
        position: 'absolute',
        bottom: 6,
        right: 8,
        fontSize: 10,
        color: 'gray'
    },
    list: {
        width: THEME.WIDTH,
    }
})