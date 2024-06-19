import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { DarkTheme, LightTheme } from 'src/theme'

import RootNavigator from './rootNavigator'

export default function Navigation() {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
