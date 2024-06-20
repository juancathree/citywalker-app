import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'twrnc'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'

export function CloseTag() {
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()
  return (
    <FontAwesome
      name="close"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
      style={tailwind`self-end justify-start`}
    />
  )
}
