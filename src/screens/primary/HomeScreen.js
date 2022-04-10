import { useCallback, useRef } from 'react';
import { View, PanResponder, StyleSheet, SafeAreaView, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { AppButton } from '../../components/AppButton'
import { Card } from '../../components/ui/Card'
import { setAuth } from '../../store/actions/dataActions'
import { useTheme } from '@react-navigation/native';
import { THEME } from '../../theme';

export const HomeScreen = () => {

    const { colors } = useTheme()

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(setAuth('token',''))
    }

    
    
    const swipe = useRef(new Animated.ValueXY()).current
    const tiltSign = useRef( new Animated.Value(1)).current

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x : dx, y: dy })
            tiltSign.setValue(y0 > THEME.HEIGHT*0.7 / 2 ? 1 : -1)
        },
        onPanResponderRelease: (_, { dx, dy }) => {

            const direction = Math.sign(dx)
            const isActionActive = Math.abs(dx) > 100

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * 500,
                        y: dy,  
                    }, 
                    useNativeDriver: true
                })

            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start()
            }

        }
    })

    const dragHandlers = panResponder.panHandlers

    return (
        <SafeAreaView style={styles.container}>
            <Card tiltSign={tiltSign} {...dragHandlers} swipe={swipe} />
            <View style={styles.actions}>
                <ActionButton name='close' color='red' />
                <ActionButton name='heart-o' color={colors.primary} />
            </View>
        </SafeAreaView>
    )
}


const ActionButton = ({ name, color }) => {
    const scale = useRef( new Animated.Value(1)).current
    const animateScale = useCallback(
        (newValue) => {
            Animated.spring(scale, {
                duration: 100,
                toValue: newValue,
                friction: 4,
                useNativeDriver: true
            }).start()
        },
        [scale]
    )
    return (
        <AppButton
            onPressIn={() => animateScale(0.8) }
            onPressOut={() => animateScale(1)}
            >
            <Animated.View style={[styles.action,{ transform: [{ scale }] }]}>
                <FontAwesome name={name} size={34} color={color} />
            </Animated.View>
        </AppButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 200,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 14
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    action: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF5E6',
        borderRadius: 28,
        elevation: 4
    }
})