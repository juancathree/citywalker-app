import { Divider } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import * as yup from 'yup';

import { useLogin } from '@/api/auth/useLogin';
import { SocialNetworks } from '@/components/form/socialNetworks';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useThemeConfig } from '@/core/use-theme-config';
import ForgotPasswordModal from '@/layout/forgotPasswordModal';
import { Form } from '@/layout/form';
import type { User } from '@/types/user';
import { Background } from '@/ui/background';
import { Link } from '@/ui/link';
import Text from '@/ui/text';
import Title from '@/ui/title';

const schema = yup.object({
  email: yup
    .string()
    .required(i18next.t('schema.email.required')!)
    .email(i18next.t('schema.email.invalid')!),
  password: yup
    .string()
    .required(i18next.t('schema.password.required')!)
    .min(8, i18next.t('schema.password.minLength')!),
});

export default function Login() {
  const router = useRouter();
  const theme = useThemeConfig();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { mutate: login } = useLogin();
  const signIn = useAuth.use.signIn();
  const { t } = useTranslation();
  useSoftKeyboardEffect();

  const user: User = {
    email: '',
    password: '',
  };

  const onSubmit = (data: User) => {
    console.log(data);
    login(data, {
      onSuccess: (response) => {
        signIn(response.jwt, response.user);
        router.push('/');
      },
    });
  };

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1 items-center justify-center`}>
        <View className="items-center">
          <Title />
        </View>
        <View style={tailwind`mt-20 w-80 items-center`}>
          <Form
            data={user}
            schema={schema}
            onSubmit={onSubmit}
            buttonText="Login"
          >
            <View style={tailwind`self-start`}>
              <Link
                text={t('screens.login.forgotPassword')}
                action={() => setIsModalVisible(true)}
              />
            </View>
          </Form>
          <Divider style={tailwind`mt-10 w-full bg-[${theme.colors.text}]`} />
          <View style={tailwind`mt-10`}>
            <SocialNetworks />
          </View>
          <View style={tailwind`flex-row gap-2 self-center mt-10`}>
            <Text style={tailwind`font-bold`}>
              {t('screens.login.notAccount')}
            </Text>
            <Link
              action={() => router.push('/register')}
              text={t('screens.login.register')}
              testID="register-link"
            />
          </View>
          <ForgotPasswordModal
            isVisible={isModalVisible}
            hideModal={() => setIsModalVisible(false)}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
}
