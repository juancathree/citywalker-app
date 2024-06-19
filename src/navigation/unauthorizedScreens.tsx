import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, ConfirmCodeScreen, ForgotPasswordScreen } from 'src/screens'

import type { User } from 'src/types/user'

export type UnauthorizedScreensParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: { user: User }
  ConfirmCode: { user: User }
}

export default function UnauthorizedScreens() {
  const { Navigator, Screen } = createNativeStackNavigator<UnauthorizedScreensParamList>()

  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Screen
        name="ConfirmCode"
        component={ConfirmCodeScreen}
        options={{ presentation: 'modal' }}
      />
    </Navigator>
  )
}
