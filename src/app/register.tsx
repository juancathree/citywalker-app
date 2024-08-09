import { Divider } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import i18next from 'i18next';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import * as yup from 'yup';

import { SocialNetworks } from '@/components/form/socialNetworks';
import { setUser } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useThemeConfig } from '@/core/use-theme-config';
import { Form } from '@/layout/form';
import type { User } from '@/types/user';
import { Background } from '@/ui/background';
import { Icon } from '@/ui/icon';

const schema = yup.object({
  email: yup
    .string()
    .required(i18next.t('schema.email.required')!)
    .email(i18next.t('schema.email.invalid')!),
  password: yup
    .string()
    .required(i18next.t('schema.password.required')!)
    .min(8, i18next.t('schema.password.minLength')!),
  confirmPassword: yup
    .string()
    .required(i18next.t('schema.password.bothMustMatch')!)
    .equals([yup.ref('password')], i18next.t('schema.password.bothMustMatch')!),
  fullName: yup.string().required(i18next.t('schema.fullName.required')!),
});

export default function Register() {
  const router = useRouter();
  const theme = useThemeConfig();
  useSoftKeyboardEffect();

  const onSubmit = (data: User) => {
    setUser(data);
    router.navigate('/confirmCode');
  };

  const user: User = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1 items-center justify-center`}>
        <TouchableOpacity
          style={tailwind`self-start pl-10 pt-10`}
          onPress={() => router.back()}
        >
          <Icon name="back" fill={theme.colors.text} />
        </TouchableOpacity>
        <View style={tailwind`flex-1 items-center justify-center`}>
          <View style={tailwind`self-start`}>
            <Text
              testID="title"
              style={tailwind`text-[${theme.colors.text}] text-14`}
            >
              Signup
            </Text>
          </View>
          <View style={tailwind`w-80 mt-10`}>
            <Form
              data={user}
              schema={schema}
              onSubmit={onSubmit}
              buttonText="Sign Up"
            />
            <Divider style={tailwind`mt-10 w-full bg-[${theme.colors.text}]`} />
            <View style={tailwind`mt-10`}>
              <SocialNetworks />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}
