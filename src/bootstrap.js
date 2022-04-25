import { loadAsync } from 'expo-font';
import { DB } from './db';

export async function bootstrap() {
    await loadAsync({
        PhoneNum: require('../assets/fonts/Fredoka.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        Inter: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
        Code: require('../assets/fonts/Code-Italic.ttf'),
        OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf')
    })

    try {
        await DB.init()
        console.log('Database started...')
    } catch (e) {
        console.log('Error: ', e)
    }


}