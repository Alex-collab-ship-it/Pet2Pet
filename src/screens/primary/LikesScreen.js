import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

export const LikesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Симпатии</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})