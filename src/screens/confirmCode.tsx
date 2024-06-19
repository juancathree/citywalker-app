import { useEffect } from 'react'

import { useNavigation, type RouteProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native'
import Toast from 'react-native-toast-message'
import { OTP, Background } from 'src/components'
import { AskConfirmCode } from 'src/services/auth'
import tailwind from 'twrnc'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'

type ConfirmCodeRouteProp = RouteProp<UnauthorizedScreensParamList, 'ConfirmCode'>

type Props = {
  route: ConfirmCodeRouteProp
}

export const ConfirmCodeScreen = ({ route }: Props) => {
  const { user } = route.params
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const json = await AskConfirmCode(user)
        user.confirmCode = json['code']
      } catch {
        Toast.show({
          type: 'error',
          text1: t('screens.confirmCode.errorFetchingCode')
        })
        navigation.goBack()
      }
    }

    fetchCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1`}>
        <OTP user={user} />
      </SafeAreaView>
    </Background>
  )
}
