import { useState } from 'react'

import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { OtpInput } from 'react-native-otp-entry'
import Toast from 'react-native-toast-message'
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
  const [attempts, setAttempts] = useState(0)
  const { createAccount } = useAuth()

  const action =
    navigation.getState().routes[navigation.getState().index - 1]?.name === 'Login'
      ? (user: User) => navigation.navigate('ForgotPassword', { user })
      : (user: User) => createAccount(user)

  const onEndEntry = (code: string) => {
    if (code === user.confirmCode) {
      action(user)
    } else {
      setAttempts(attempts + 1)
      if (attempts >= 3) {
        Toast.show({ type: 'error', text1: t('toast.otp.toMuchAttempts') })
        navigation.goBack()
      } else {
        Toast.show({ type: 'error', text1: t('toast.otp.wrongOTPCode') })
      }
    }
  }

  return (
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
  )
}
