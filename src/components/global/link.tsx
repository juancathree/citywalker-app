import { useTheme } from '@react-navigation/native'
import { TouchableOpacity, Text } from 'react-native'
import tailwind from 'twrnc'

type Props = {
  text: string
  action: () => void
}

export function Link({ text, action }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={action} testID="link">
      <Text style={tailwind`text-[${colors.primary}] font-bold`}>{text}</Text>
    </TouchableOpacity>
  )
}
