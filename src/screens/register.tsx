import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, Text, View } from 'react-native'
import { Form, Background, Divider, SocialNetworks, ArrowBack } from 'src/components'
import useAuth from 'src/hooks/useAuth'
import tailwind from 'twrnc'
import * as yup from 'yup'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
import type { User } from 'src/types/user'

export const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()
  const { isLoading } = useAuth()
  const { t } = useTranslation()

  const user: User = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  }

  const schema = yup.object({
    email: yup.string().required(t('schema.email.required')).email(t('schema.email.invalid')),
    password: yup.string().required(t('schema.password.required')).min(8, t('schema.password.min')),
    confirmPassword: yup.string().equals([yup.ref('password')], t('schema.password.bothMustMatch')),
    fullName: yup.string().required(t('schema.fullName.required'))
  })

  const onSubmit = (user: User) => {
    navigation.navigate('ConfirmCode', {
      user
    })
  }

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1`}>
        <View style={styles.container}>
          <View style={styles.backContainer}>
            <ArrowBack action={() => navigation.goBack()} />
          </View>
          <Text style={styles.title}>{t('screens.register.title')}</Text>
          <Text style={styles.description}>{t('screens.register.description')}</Text>
          <Form
            data={user}
            isLoading={isLoading}
            schema={schema}
            buttonTitle={t('screens.register.button')}
            action={onSubmit}
          />
          <Divider />
          <SocialNetworks />
        </View>
      </SafeAreaView>
    </Background>
  )
}

const styles = {
  container: tailwind`flex-1 items-center justify-center p-10`,
  backContainer: tailwind`self-start mb-10`,
  title: tailwind`text-10 self-start`,
  description: tailwind`self-start mb-10`,
  link: (color: string) => tailwind`text-[${color}] font-bold`
}
