import { useCallback, useEffect, useRef, useState } from 'react';
import { View, PanResponder, StyleSheet, SafeAreaView, Animated, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import { AppButton } from '../../components/AppButton'
import { Card } from '../../components/ui/Card'
import { useTheme } from '@react-navigation/native';
import { THEME } from '../../theme';
import { getAnket, getPet, sendChoice } from '../../ServerRequests';



export const HomeScreen = ({ navigation, route }) => {
    const { token } = route.params
    const { colors } = useTheme()
    const [pets, setPets] = useState([])

    const loadPets = async (isFirst = false) => {
        if (pets.length <= 1 ) {
            if (isFirst) {
                const newPet = await getAnket(token, true)
                if (newPet.id !== -1) {
                    setPets(state => [...state, newPet])
                }
            }
            const newPet = await getAnket(token, false)
            if (newPet.id !== -1) {
                setPets(state => [...state, newPet])
            }
        }
    }

    useEffect(async () => {
        const result = await getPet(token)
        if (result.id === -1){
            navigation.navigate('CreatePetModal', { closable: false, photos: []  })
        } else {
            if (pets.length === 0) {
                await loadPets(true)
            }
        }
    }, [])

    const swipe = useRef(new Animated.ValueXY()).current
    const tiltSign = useRef( new Animated.Value(1)).current
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x : dx, y: dy })
            tiltSign.setValue(y0 > THEME.HEIGHT*0.9 / 2 ? 1 : -1)
        },
        onPanResponderRelease: async (_, { dx, dy }) => {
            const direction = Math.sign(dx)
            const isActionActive = Math.abs(dx) > 100
            if (isActionActive) {
                await sendChoice(data.userToken, pets[0].owner, direction === 1 ? "L" : "D")
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * 500,
                        y: dy,  
                    }, 
                    useNativeDriver: true
                }).start(removeTopCard)
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
    const removeTopCard = useCallback(() => {
        setPets((prevState) => prevState.slice(1))
        swipe.setValue({ x: 0, y: 0 })
        loadPets()
    }, [swipe])

    const handleChoice = useCallback((direction) => {
        sendChoice(data.userToken, pets[0].owner, direction === 1 ? "L" : "D")
        Animated.timing(swipe.x,{
            toValue: direction * THEME.WIDTH * 1.5,
            duration: 400,
            useNativeDriver: true
        }).start(removeTopCard)
    }, [removeTopCard, swipe.x])

    return (
        <SafeAreaView style={styles.container}>
            { pets.length !== 0 ?
            (<>
                <View style={{ width: THEME.WIDTH*0.9, height: THEME.HEIGHT*0.63, position: 'relative' }}>
                    { pets.map((pet, index) => {
                        const isF = index === 0
                        const dragHandlers = isF ? panResponder.panHandlers : {}
                        return (
                            <Card
                                tiltSign={tiltSign}
                                pet={pet} 
                                swipe={swipe}
                                key={index}
                                isFirst={isF}
                                token={token}
                                {...dragHandlers}
                                />
                        )
                    }).reverse()}
                </View>
                <View style={styles.actions}>
                    <ActionButton name='close' color='red' handleChoice={handleChoice} />
                    <ActionButton name='heart-o' color={colors.primary} handleChoice={handleChoice} />
                </View>
            </>
            ) : (
                <Text style={styles.emptyTitle}>Пока нет анкет ;(</Text>
            )}
        </SafeAreaView>
    )
}




const ActionButton = ({ name, color, handleChoice }) => {
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
            onPress={() => handleChoice(name == 'close' ? -1 : 1)}
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
        justifyContent: 'space-evenly'
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
    },
    emptyTitle: {
        fontSize: 18,
        fontFamily: 'Inter'
    }
})