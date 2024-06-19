import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { useColorScheme } from 'react-native'

import type { StatusBarProps } from 'expo-status-bar'

export function StatusBar(props: StatusBarProps) {
  const scheme = useColorScheme()

  return (
    <ExpoStatusBar
      animated
      hideTransitionAnimation="fade"
      style={scheme === 'dark' ? 'dark' : 'light'}
      {...props}
    />
  )
}
