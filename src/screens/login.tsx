import { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, Text, SafeAreaView } from 'react-native'
import {
  Background,
  Divider,
  ForgotPassword,
  Form,
  Link,
  LoginTitle,
  SocialNetworks
} from 'src/components'
import useAuth from 'src/hooks/useAuth'
import tailwind from 'twrnc'
import * as yup from 'yup'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
import type { User } from 'src/types/user'

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()
  const { login, isLoading } = useAuth()
  const [isVisible, setVisible] = useState<boolean>(false)
  const { t } = useTranslation()

  const user: User = {
    email: '',
    password: ''
  }

  const schema = yup.object({
    email: yup.string().required(t('schema.email.required')).email(t('schema.email.invalid')),
    password: yup
      .string()
      .required(t('schema.password.required'))
      .min(8, t('schema.password.minLength'))
  })

  return (
    <Background>
      <ForgotPassword isVisible={isVisible} setVisible={setVisible} />
      <SafeAreaView style={tailwind`flex-1`}>
        <View style={styles.container}>
          <LoginTitle />
          <Form
            data={user}
            buttonTitle={t('screens.login.loginButton')}
            action={login}
            isLoading={isLoading}
            schema={schema}>
            <View style={styles.forgotLink}>
              <Link
                action={() => setVisible(!isVisible)}
                text={t('screens.login.forgotPassword')}
              />
            </View>
          </Form>
          <Divider />
          <SocialNetworks />
          <View style={styles.createAccountContainer}>
            <Text>{t('screens.login.notAccount')}</Text>
            <Link
              action={() => navigation.navigate('Register')}
              text={t('screens.login.register')}
            />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  )
}

const styles = {
  container: tailwind`flex-1 items-center justify-center p-10`,
  forgotLink: tailwind`self-start`,
  createAccountContainer: tailwind`flex-row mt-10`
}
// import React from 'react'

// import { useNavigation } from '@react-navigation/native'
// import { useTranslation } from 'react-i18next'
// import { SafeAreaView, Text, View } from 'react-native'
// import { Form, Background, Divider, SocialNetworks, ArrowBack } from 'src/components'
// import useAuth from 'src/hooks/useAuth'
// import tailwind from 'twrnc'
// import * as yup from 'yup'

// import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
// import type { User } from 'src/types/user'

// export const LoginScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()
//   const { createAccount, isLoading } = useAuth()
//   const { t } = useTranslation()

//   const user: User = {
//     email: '',
//     fullName: '',
//     password: '',
//     confirmPassword: ''
//   }

//   const schema = yup.object({
//     email: yup.string().required(t('schema.email.required')).email(t('schema.email.invalid')),
//     password: yup.string().required(t('schema.password.required')).min(8, t('schema.password.min')),
//     confirmPassword: yup.string().equals([yup.ref('password')], t('schema.password.bothMustMatch')),
//     fullName: yup.string().required(t('schema.fullName.required'))
//   })

//   const onSubmit = (user: User) => {
//     navigation.navigate('ConfirmCode', {
//       user,
//       action: createAccount
//     })
//   }

//   return (
//     <Background>
//       <SafeAreaView style={tailwind`flex-1`}>
//         <View style={styles.backContainer}>
//           <ArrowBack action={() => navigation.goBack()} />
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.title}>{t('screens.register.title')}</Text>
//           <Text style={styles.description}>{t('screens.register.description')}</Text>
//           <Form
//             data={user}
//             isLoading={isLoading}
//             schema={schema}
//             buttonTitle={t('screens.register.button')}
//             action={onSubmit}
//           />
//           <Divider />
//           <SocialNetworks />
//         </View>
//       </SafeAreaView>
//     </Background>
//   )
// }

// const styles = {
//   backContainer: tailwind`pl-10 android:pt-10`,
//   container: tailwind`flex-1 items-center p-10`,
//   title: tailwind`text-10 self-start`,
//   description: tailwind`self-start mb-10`,
//   link: (color: string) => tailwind`text-[${color}] font-bold`
// }
