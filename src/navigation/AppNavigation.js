import { useEffect, useState } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

import { AuthScreen } from '../screens/auth/AuthScreen';
import { HomeScreen } from '../screens/primary/HomeScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { getAuth, loadAllChats } from '../store/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmMailScreen } from '../screens/auth/ConfrimMailScreen';
import { AccountScreen } from '../screens/primary/AccountScreen';
import { LikesScreen } from '../screens/primary/LikesScreen';
import { CreatePetScreen } from '../screens/primary/CreatePetScreen';
import ImageBrowserScreen from '../screens/primary/ImageBrowserScreen';
import { ChatScreen } from '../screens/primary/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function BottomNavigation({ route }) {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAllChats(route.params.token))
  }, [])
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      headerShadowVisible: false,
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'InterRegular'
      },
      tabBarStyle: {
        alignItems: 'space-between'
      }
    }}>
      <Tab.Screen name="Account" component={AccountScr} initialParams={route.params}
        options={{
        title: 'Аккаунт',
        tabBarIcon: ({ focused, color, size }) =>  <MaterialCommunityIcons name="account-circle-outline" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
      <Tab.Screen name="Home"
        initialParams={route.params}
        component={HomeScr}
        options={{
        title: 'Главная',
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="pets" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
      <Tab.Screen name="Likes" component={LikesScr} initialParams={route.params} options={{
        title: 'Симпатии',
        tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons name="heart-multiple-outline" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
    </Tab.Navigator>
  )
}

export const AppNavigation = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuth())
  }, [dispatch])

  const data = useSelector(state => state.data)

  
  if (data.loading) {
    return <AppLoading />
  }



  return (
    <NavigationContainer theme={theme} >
      <Stack.Navigator
        screenOptions={{ headerShadowVisible: false, headerShown: false }}>
          {data.isSigned ? (
            <Stack.Group>
                <Stack.Screen name='Main' component={BottomNavigation} initialParams={{ token: data.userToken, mail: data.userMail }} />
                <Stack.Screen name='CreatePetModal' options={{ presentation: 'modal' }} component={CreatePetScr} initialParams={{ token: data.userToken }} />
                <Stack.Screen name='Chat' component={ChatScr} initialParams={{ token: data.userToken, mail: data.userMail }}
                  options={{
                    gestureEnabled: true,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                  }} />
            </Stack.Group>
          ) :  (
            <Stack.Group screenOptions={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
              <Stack.Screen name='Auth' options={{ animationTypeForReplace: !data.isSigned ? 'pop' : 'push', }} component={Auth} />
              <Stack.Screen name='ConfirmMail'  component={ConfirmMail} />
              <Stack.Screen name='SignUp' component={SignUp} />
              <Stack.Screen name='SignIn' component={SignIn} />
            </Stack.Group>
          )}
          <Stack.Screen name='ImageBrowser' component={ImageBrowserScreen} initialParams={{ token: data.userToken }} options={{ title: 'Выбрано 0', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



function HomeScr({ navigation, route }) {
  return (
    <HomeScreen navigation={navigation} route={route} />
  )
}

function AccountScr({ navigation, route }) {
  return (
    <AccountScreen navigation={navigation} route={route} />
  )
}

function LikesScr({ navigation, route }) {
  return (
    <LikesScreen navigation={navigation} route={route} />
  )
}

function CreatePetScr({ navigation, route = { params: { closable: false } } }) {
  return (
    <CreatePetScreen navigation={navigation} route={route} />
  )
}

function ChatScr({ navigation, route }) {
  return (
    <ChatScreen navigation={navigation} route={route} />
  )
}

function Auth({ navigation }) {
  return (
    <AuthScreen navigation={navigation} />
  )
}

function SignUp({ navigation, route }) {
  return (
    <SignUpScreen navigation={navigation} route={route}  />
  )
}

function SignIn({ navigation, route }) {
  return (
    <SignInScreen navigation={navigation} route={route} />
  )
}

function ConfirmMail({ navigation, route }) {
  return (
    <ConfirmMailScreen navigation={navigation} route={route} />
  )
}




const theme = {
  dark: false,
  colors: {
    primary: '#0fad89',
    background: '#EDEDF3', // #f9f9f9
    card: '#FDF5E6',
    text: 'rgb(28, 28, 30)',
    notification: 'rgb(255, 69, 58)',
    border: 'rgb(199, 199, 204)',
    light_gray: '#ccc' ,
    red: '#D83C73'
  },
};
