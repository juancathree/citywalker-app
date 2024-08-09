import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import tailwind from 'twrnc';

import { useRegister } from '@/api/auth/useRegister';
import { useAuth } from '@/core';
import { getUser } from '@/core/auth/utils';
import { useThemeConfig } from '@/core/use-theme-config';

export default function OTP() {
  const theme = useThemeConfig();
  const signIn = useAuth.use.signIn();
  const user = getUser();
  const navigation = useNavigation();
  const router = useRouter();
  const { mutate: register } = useRegister();

  const onSuccess = (response: any) => {
    signIn(response.jwt, response.user);
    Toast.show({
      type: 'success',
      text1: 'Welcome to the app',
      text2: 'You are now logged in',
    });
    router.push('/');
  };

  const action =
    navigation.getState().routes[navigation.getState().index - 1]?.name ===
      'Login'
      ? () => router.push('/forgotPassword')
      : () => register(user, { onSuccess: onSuccess });

  const onEndEntry = (code: string) => {
    if (code === user.confirmCode) {
      action();
    } else {
      console.log('error');
    }
  };

  return (
    <OtpInput
      numberOfDigits={4}
      focusColor={theme.colors.primary}
      focusStickBlinkingDuration={500}
      onFilled={onEndEntry}
      theme={{
        containerStyle: tailwind`w-50 mt-10`,
        pinCodeContainerStyle: tailwind`bg-[${theme.colors.card}] rounded`,
        pinCodeTextStyle: tailwind`text-[${theme.colors.text}]`,
      }}
    />
  );
}
