import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, TouchableWithoutFeedback, Keyboard, SafeAreaView, FlatList } from 'react-native'
import ModalSelector from 'react-native-modal-selector-searchable'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as Location from 'expo-location';

import { AppButton } from '../../components/AppButton';
import { Separator } from '../../components/Separator';
import { THEME } from '../../theme';
import { AddPet } from '../../ServerRequests';


export const CreatePetScreen = ({ navigation, route }) => {

    const { photos, closable, token } = route.params
    const [location, setLocation] = useState(null);
    const askForPermissions = async () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
      
            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords);
          })()
    }
    
    const sendHandler = async () => { 
        askForPermissions()
        if (name === '' || breed === '' || age === '' || photos.length === 0 || token === '' || location === null) {
            alert('Зополните все поля')
            return
        }
        const result = await AddPet(name, breed, age, photos, token, info, man, cat, location)
        if (result === '1') {
            navigation.goBack()
        }

    }
    const { colors } = useTheme()
    const [ cat, setCat ] = useState(false)
    const [ man, setMan ] = useState(false)
    const [ breed, setBreed ] = useState('')
    const [ name, setName ] = useState('')
    const [ age, setAge ] = useState('')
    const [ info, setInfo ] = useState('')

    if (location === null || location === undefined) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <AppButton onPress={askForPermissions}>
                    <Text>Предоставьте все необходимые разрешения</Text>
                </AppButton>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        { closable && <Ionicons onPress={() => navigation.pop()} name="ios-arrow-back" size={30} color="black" /> }
                        <Text style={styles.title}>Теперь расскажите нам о вашем питомце</Text>
                        { photos.length > 0 ? (
                            <>
                                <Separator />
                                <FlatList showsHorizontalScrollIndicator={false} style={{ width: '100%', height: 150, borderRadius: 10  }}
                                    horizontal={true} data={photos} renderItem={({item, index}) => 
                                    <Image
                                        style={{ width: 120, height: 150, resizeMode: 'cover', borderRadius: 10, marginHorizontal: 6 }}
                                        source={{ uri: item.uri }}
                                        key={index} />
                                } />
                                <Separator />
                            </>
                        ) : (
                            <AppButton onPress={() => navigation.navigate('ImageBrowser', { closable: closable })} style={[styles.button, { height: 100,  borderColor: colors.border, borderWidth: 1, borderRadius: 13, borderStyle: 'dashed' }]}>
                                <MaterialIcons name="add-photo-alternate" size={36} color={ colors.primary } />
                            </AppButton>
                        )}

                        <TextInput autoComplete='name' placeholder='Имя' value={name} onChangeText={setName} style={styles.input} />
                        <View style={radio.container}>
                            <View style={radio.wrapper}>
                                <Text style={radio.text}>Собака</Text>
                                <RadioButton selected={!cat} onPress={() => setCat(false)} />
                            </View>
                            <View style={radio.wrapper}>
                                <Text style={radio.text}>Кошка</Text>
                                <RadioButton selected={cat} onPress={() => setCat(true)} />
                            </View>
                        </View>
                        <Separator />
                        <View style={radio.container}>
                            <Text style={{ fontFamily: 'InterBold', fontSize: 20 }}>Пол:</Text>
                            <View style={[radio.wrapper, { flexDirection: 'row' }]}>
                                <Text style={[radio.text, { marginRight: 5 }]}>М</Text>
                                <RadioButton selected={man} onPress={() => setMan(true)} />
                            </View>
                            <View style={[radio.wrapper, { flexDirection: 'row' }]}>
                                <Text style={[radio.text, { marginRight: 5 }]}>Ж</Text>
                                <RadioButton selected={!man} onPress={() => setMan(false)} />
                            </View>
                        </View>
                        <ModalSelector
                            data={breeds}
                            initValue="Порода"
                            onChange={option => setBreed(option.label)}
                            cancelText='Закрыть'
                            searchText='Найти...'
                            />
                        <Separator />
                        <ModalSelector
                            data={ages}
                            initValue="Возраст"
                            onChange={option => setAge(option.label)}
                            cancelText='Закрыть'
                            search={false}/>
                        <TextInput placeholder='Дополнительная информация' onChangeText={setInfo} multiline={true} value={info}
                            style={[styles.input,{ borderWidth: 1, fontSize: 15, borderRadius: 8, marginTop: 10 }]} />
                        <Separator />

                        <AppButton
                            style={[styles.button, { backgroundColor: colors.primary, elevation: 5 }]}
                            onPress={sendHandler}>
                            <Text style={styles.btnTitle}>Добавить</Text>
                        </AppButton>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const RadioButton = ({ selected, onPress }) => {
    const { colors } = useTheme()
    return(
        <AppButton style={radio.button} onPress={onPress}>
            <View style={[radio.inner, { backgroundColor: selected ? colors.primary : '#fff' }]}></View>
        </AppButton>
    )
}

const ImageView = (item, i) => {
    return (
        <Image
            style={{ height: 100, width: 100, resizeMode: 'contain', borderRadius: 10 }}
            source={{ uri: item.uri }}
            key={i}
            />
    )
}

const breeds = [
    { key: 1, section: true, label: 'Fruits' },
    { key: 2, label: 'Red Apples' },
    { key: 3, label: 'Cherries' },
    { key: 4, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
    { key: 5, label: 'Vegetable', customKey: 'Not a fruit' }
];

let ages = []
for (let i = 1; i<21; i += 1) {
    ages.push({
        key: i,
        label: i + ' лет'
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        width: '100%',
        fontFamily: 'InterRegular',
        borderColor: '#ccc',
        borderBottomWidth: 0.4,
        fontSize: 24,
        marginVertical: 10,
    },
    button: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        marginTop: 10
    },
    image: {
        width: '100%',
        height: THEME.HEIGHT*0.2,
        borderRadius: 10
    },
    btnTitle: {
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 20
    }
})

const radio = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        alignItems: 'center',

    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        width: 12,
        height: 12,
        borderRadius: 6
    },
    wrapper: {
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Inter',
        fontSize: 16
    }
    
})