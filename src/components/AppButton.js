import { TouchableOpacity, TouchableNativeFeedback, Platform, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

export const AppButton = ({ children, onPress, style, disabled = false, ...rest }) => {
    return (
        <TouchableOpacity {...rest}
            onPress={onPress} activeOpacity={1} disabled={disabled}>
            <View style={[styles.button, style]}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})