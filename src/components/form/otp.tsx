import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OtpInput } from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import tailwind from 'twrnc';

import { useAuth } from '@/core/hooks/useAuth';
import { useThemeConfig } from '@/core/useThemeConfig';

type Props = {
  route: string;
};

export function OTP({ route }: Props) {
  const theme = useThemeConfig();
  const { user, confirmCode, register } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  const action =
    route === 'login'
      ? () => router.push('/forgotPassword')
      : () => register(user);

  const onEndEntry = (code: string) => {
    if (code === confirmCode) {
      action();
    } else {
      Toast.show({
        type: 'error',
        text1: t('toast.otp.invalidCodeTitle')!,
        text2: t('toast.otp.invalidCodeDescription')!,
        topOffset: 80,
      });
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
