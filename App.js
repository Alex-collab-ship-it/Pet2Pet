import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';

import store from './src/store'
import { AppNavigation } from './src/navigation/AppNavigation';
import { bootstrap } from './src/bootstrap';
import { Provider } from 'react-redux';



export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
