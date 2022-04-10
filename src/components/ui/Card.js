import { useCallback } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import { THEME } from '../../theme'
import { Choice } from './Choice'

export const Card = ({ tiltSign, swipe, ...rest }) => {

    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-200, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })
    
    const rotate = Animated.multiply(tiltSign, swipe.x).interpolate({
        inputRange: [-100, 0 , 100],
        outputRange: ['10deg', '0deg', '-10deg'],
    })
    
    const animateCardStyle = {
        transform: [ ...swipe.getTranslateTransform(), { rotate } ]
    }

    return (
        <Animated.View style={[styles.container, animateCardStyle]} {...rest}>
            <Image style={styles.img} source={{uri: 'https://s.hdnux.com/photos/74/47/71/15892083/3/rawImage.jpg'}} />
            <Animated.View
            style={[
                styles.choiceContainer,
                { left: 45, transform: [{ rotate: '-30deg' }], opacity: likeOpacity }]}>
                <Choice name='grin-hearts' />
            </Animated.View>
            <Animated.View style={[
                styles.choiceContainer,
                { right: 45, transform: [{ rotate: '-30deg' }], opacity: nopeOpacity }]}>
                <Choice name='ban' />
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: THEME.WIDTH*0.9,
        height: THEME.HEIGHT*0.7,
        borderRadius: 20,
        elevation: 5
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        resizeMode: 'cover'
    },
    choiceContainer: {
        position: 'absolute',
        top: 100
    }
})