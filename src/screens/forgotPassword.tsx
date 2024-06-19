import { useNavigation, type RouteProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, Text, View } from 'react-native'
import { Background, Form } from 'src/components'
import useAuth from 'src/hooks/useAuth'
import tailwind from 'twrnc'
import * as yup from 'yup'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
import type { User } from 'src/types/user'

type ConfirmCodeRouteProp = RouteProp<UnauthorizedScreensParamList, 'ForgotPassword'>

type Props = {
  route: ConfirmCodeRouteProp
}

export const ForgotPasswordScreen = ({ route }: Props) => {
  const { user } = route.params
  const { t } = useTranslation()
  const { resetPassword } = useAuth()
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()

  const newUserPass: User = {
    email: user.email,
    password: '',
    confirmPassword: ''
  }

  const schema = yup.object({
    password: yup
      .string()
      .required(t('schema.password.required'))
      .min(8, t('schema.password.minLength')),
    confirmPassword: yup
      .string()
      .equals([yup.ref('password')], t('schema.password.confirmPassword'))
  })

  const action = (data: User) => {
    data.email = user.email
    resetPassword(data)
    navigation.navigate('Login')
  }

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1`}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={tailwind`text-10`}>{t('screens.forgotPassword.title')}</Text>
            <Text>{t('screens.forgotPassword.description')}</Text>
          </View>
          <Form
            data={newUserPass}
            buttonTitle={t('screens.forgotPassword.button')}
            action={action}
            isLoading={false}
            schema={schema}
          />
        </View>
      </SafeAreaView>
    </Background>
  )
}

const styles = {
  container: tailwind`flex-1 justify-center items-center p-10`,
  titleContainer: tailwind`mb-10 self-start`,
  title: tailwind`text-10`
}
