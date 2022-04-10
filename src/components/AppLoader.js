import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

export const AppLoader = ({ size }) => (
    <View style={styles.center}>
        <ActivityIndicator size={size} color={'blue'} />
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})