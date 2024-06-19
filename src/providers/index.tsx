import { useEffect } from 'react'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableFreeze } from 'react-native-screens'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'src/components'
import tailwind from 'twrnc'

import 'src/i18n'

SplashScreen.preventAutoHideAsync()
enableFreeze(true)

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    Kaushan: require('assets/fonts/KaushanScript-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={tailwind`flex-1`}>
      <SafeAreaProvider>
        <StatusBar />
        <KeyboardAvoidingView
          style={{ display: 'flex', flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {children}
        </KeyboardAvoidingView>
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
