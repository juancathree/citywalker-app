import { forwardRef, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import tailwind from 'twrnc'

interface Icons {
  [key: string]: 'envelope' | 'lock' | 'user'
}

const icons: Icons = {
  fullName: 'user',
  email: 'envelope',
  password: 'lock',
  confirmPassword: 'lock'
}

type Props = {
  name: string
  onBlur?: () => void
  [key: string]: any
}

export const FormInput = forwardRef<TextInput, Props>(({ name, onBlur, ...rest }, ref) => {
  const { colors } = useTheme()

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [seePass, setSeePass] = useState<boolean>(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  return (
    <View
      style={[
        styles.container,
        tailwind`bg-[${colors.card}] ${
          isFocused ? `border-[${colors.primary}]` : `border-transparent`
        }`
      ]}>
      <View style={styles.icon}>
        <FontAwesome
          name={icons[name]}
          size={23}
          color={isFocused ? colors.primary : colors.border}
        />
      </View>
      <TextInput
        {...rest}
        testID={`${name}-input`}
        ref={ref}
        onFocus={handleFocus}
        style={tailwind`flex-1`}
        placeholderTextColor={colors.border}
        onBlur={handleBlur}
        secureTextEntry={name === 'password' || name === 'confirmPassword' ? !seePass : false}
      />
      {name === 'password' || name === 'confirmPassword' ? (
        <TouchableOpacity onPress={() => setSeePass(!seePass)}>
          <FontAwesome
            name={seePass ? 'eye' : 'eye-slash'}
            size={23}
            color={seePass ? colors.primary : colors.border}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
})

const styles = {
  container: tailwind`flex flex-row items-center rounded p-3 shadow-md border`,
  icon: tailwind`mr-2 justify-center w-8 items-center`
}
