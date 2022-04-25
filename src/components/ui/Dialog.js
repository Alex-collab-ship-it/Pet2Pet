import { useTheme } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const Dialog = ({ token, pet, onPress }) => {

    const { colors } = useTheme()

    
    const str = 'Последенее сообщение123123123'

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
            <Image style={styles.img} source={{uri: `https://pancake69.xyz/Selection/GetAnketImage?token=${token}&owner=${pet.owner}&number=1`}} /> 
            <View style={styles.wrapper}>
                <Text style={styles.title}>{pet.name + ', ' + pet.age}</Text>
                <Text style={[ styles.lastMsg, { color: colors.text }]}>{str.substring(0,23) + (str.length>23 ? '...' : '')}</Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
        elevation: 3,
        marginHorizontal: 10,
        backgroundColor: '#fff'
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 12,
    },
    img: {
        width: 65,
        height: 75,
        borderRadius: 12,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 18,
        fontFamily: 'OpenSansBold'
    },
    lastMsg: {
        fontFamily: 'OpenSansRegular',
        marginLeft: 30,
    }
})