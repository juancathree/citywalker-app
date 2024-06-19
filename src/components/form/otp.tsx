import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import Toast from 'react-native-toast-message'
import { CloseTag } from 'src/components/global/closeTag'
import useAuth from 'src/hooks/useAuth'
import tailwind from 'twrnc'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
import type { User } from 'src/types/user'

type Props = {
  user: User
}

export function OTP({ user }: Props) {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()
  const { createAccount } = useAuth()

  const action =
    navigation.getState().routes[navigation.getState().index - 1].name === 'Login'
      ? (user: User) => navigation.navigate('ForgotPassword', { user })
      : (user: User) => createAccount(user)

  const onEndEntry = (code: string) => {
    if (code === user.confirmCode) {
      action(user)
    } else {
      Toast.show({ type: 'error', text1: t('screens.confirmCode.wrongOTPCode') })
    }
  }

  return (
    <>
      <View style={styles.closeTag}>
        <CloseTag />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('screens.confirmCode.title')}</Text>
        <Text style={styles.description}>{t('screens.confirmCode.description')}</Text>
        <OtpInput
          numberOfDigits={4}
          focusColor={colors.primary}
          focusStickBlinkingDuration={500}
          onFilled={onEndEntry}
          textInputProps={{
            accessibilityLabel: 'One-Time Password'
          }}
          theme={{
            containerStyle: tailwind`w-50 mt-10`,
            pinCodeContainerStyle: tailwind`bg-[${colors.card}] rounded`
          }}
        />
      </View>
    </>
  )
}

const styles = {
  closeTag: tailwind`p-10 absolute w-full`,
  container: tailwind`p-10 flex-1 justify-center items-center`,
  title: tailwind`text-8 text-center`,
  description: tailwind`text-center`,
  inputs: tailwind`flex-row gap-3 mt-5`,
  input: tailwind`border-[0.5] border-transparent rounded bg-white justify-center items-center p-5`
}
