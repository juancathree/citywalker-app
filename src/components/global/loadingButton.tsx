import { useTheme } from '@react-navigation/native'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import tw from 'twrnc'

type Props = {
  text: string
  onPress: () => void
  isLoading?: boolean
}

export function LoadingButton({ text, onPress, isLoading = false }: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={styles.button(colors.primary)}
      activeOpacity={0.8}
      onPress={onPress}
      testID="loading-button">
      {!isLoading ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <ActivityIndicator color={colors.card} testID="loading-button-activity" />
      )}
    </TouchableOpacity>
  )
}

const styles = {
  button: (color: string) => tw`w-3/4 px-15 py-3 justify-center rounded shadow-md bg-[${color}]`,
  text: tw`text-center text-white font-bold`,
  activity: tw`text-white`
}
