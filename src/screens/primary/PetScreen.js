import { View, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native'
import { THEME } from '../../theme'

export const PetScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Image style={styles.img} />
                <View  style={styles.container}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    img: {
        width: '100%',
        height: THEME.HEIGHT*0.25,
    }
})