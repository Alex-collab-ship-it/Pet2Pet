import { useEffect } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets  } from '@react-navigation/stack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { AuthScreen } from '../screens/auth/AuthScreen';
import { HomeScreen } from '../screens/primary/HomeScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { loadStatus } from '../store/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { ConfirmMailScreen } from '../screens/auth/ConfrimMailScreen';
import { AccountScreen } from '../screens/primary/AccountScreen';
import { LikesScreen } from '../screens/primary/LikesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation() {

  const { colors } = useTheme()

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      headerShadowVisible: false,
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'InterRegular'
      },
      tabBarItemStyle: {
        marginVertical: 5
      },
      tabBarStyle: {
        height: 60
      }
    }}>
      <Tab.Screen name="Account" component={AccountScr} options={{
        title: 'Аккаунт',
        tabBarIcon: ({ focused, color, size }) =>  <MaterialCommunityIcons name="account-circle-outline" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
      <Tab.Screen name="Home" component={HomeScr} options={{
        title: 'Главная',
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="pets" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
      <Tab.Screen name="Likes" component={LikesScr} options={{
        title: 'Симпатии',
        tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons name="heart-multiple-outline" size={28} color={focused ? colors.primary : colors.light_gray} />
      }}/>
    </Tab.Navigator>
  )
}

export const AppNavigation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadStatus('token'))
  }, [dispatch])

  const data = useSelector(state => state.data)
  if (data.loading) {
    return <AppLoading />
  }


  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShadowVisible: false, headerShown: false }}>
          {data.isSigned ? (
            <Stack.Screen name='Main' component={BottomNavigation} />
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}


function HomeScr({ navigation }) {
  return (
    <HomeScreen />
  )
}

function AccountScr({ navigation }) {
  return (
    <AccountScreen />
  )
}

function LikesScr({ navigation }) {
  return (
    <LikesScreen />
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
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    light_gray: '#ccc' 
  },
};
