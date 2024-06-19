import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from 'src/screens/account'
import HomeScreen from 'src/screens/home'
import TravelsScreen from 'src/screens/travels'

export type AuthorizedScreensParamList = {
  Index: undefined
}

export type BottomScreensParamList = {
  Home: undefined
  Travels: undefined
  Account: undefined
}

export type ExploreScreensParamList = {
  Explore: undefined
}

export default function AuthorizedScreens() {
  const { Navigator, Screen } = createNativeStackNavigator<AuthorizedScreensParamList>()
  return (
    <Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
      <Screen name="Index" component={TabsScreens} />
    </Navigator>
  )
}

function TabsScreens() {
  const { Navigator, Screen } = createBottomTabNavigator<BottomScreensParamList>()
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Travels" component={TravelsScreen} />
      <Screen name="Account" component={AccountScreen} />
    </Navigator>
  )
}
