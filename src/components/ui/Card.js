import { View, Image, StyleSheet, Animated, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '../../theme'

export const Card = ({ tiltSign, swipe, pet, isFirst, token, ...rest }) => {

    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
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
        <Animated.View style={[styles.container, isFirst && animateCardStyle]} {...rest}>
            <Image style={styles.img} source={{uri: `https://pancake69.xyz/Selection/GetAnketImage?token=${token}&owner=${pet.owner}&number=1`}} /> 
            { isFirst && <>
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
            </>}

            <Text style={styles.name}>{pet.name + ', ' + pet.breed + ', ' + pet.age}</Text> 
        </Animated.View>
    )
}

const Choice = ({ name }) => {
    const { colors } = useTheme()
    return (
        <View>
            <FontAwesome5 name={name} size={70}
                color={name === 'ban' ? 'red' : colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: THEME.WIDTH*0.9,
        height: THEME.HEIGHT*0.63,
        borderRadius: 20,
        elevation: 5,
        zIndex: 1,
        position: 'absolute'
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
    },
    name: {
        position: 'absolute',
        fontSize: 20,
        fontFamily: 'Inter',
        color: '#fff',
        bottom: 50,
        left: 10,
    }
})