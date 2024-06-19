import { View, Image, TouchableOpacity } from 'react-native'
import useAuth from 'src/hooks/useAuth'
import tailwind from 'twrnc'

export function SocialNetworks() {
  const { continueWithGoogle } = useAuth()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={continueWithGoogle}>
        <Image source={require('assets/images/google.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: tailwind`flex mt-5 gap-5`,
  icon: tailwind`h-10 w-45 rounded border border-gray-300`
}
