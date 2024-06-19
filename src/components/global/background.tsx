import { ImageBackground } from 'react-native'
import tailwind from 'twrnc'

type Props = {
  children: React.ReactNode
}

export function Background({ children }: Props) {
  return (
    <ImageBackground source={require('assets/images/background.png')} style={tailwind`flex-1`}>
      {children}
    </ImageBackground>
  )
}
