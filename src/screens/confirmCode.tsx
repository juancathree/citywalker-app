import { useEffect } from 'react'

import { useNavigation, type RouteProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import { OTP, Background, CloseTag } from 'src/components'
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
          text1: t('toast.confirmCode.errorFetchingCode')
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
        <View style={styles.closeTag}>
          <CloseTag />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{t('screens.confirmCode.title')}</Text>
          <Text style={styles.description}>{t('screens.confirmCode.description')}</Text>
          <OTP user={user} />
        </View>
      </SafeAreaView>
    </Background>
  )
}

const styles = {
  closeTag: tailwind`p-10 absolute w-full`,
  container: tailwind`p-10 flex-1 justify-center items-center`,
  title: tailwind`text-8 text-center`,
  description: tailwind`text-center`
}
