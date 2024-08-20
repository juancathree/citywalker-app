import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { OTP } from '@/components';
import { useAuth, useSoftKeyboardEffect, useThemeConfig } from '@/core';
import { Background, Icon, Text } from '@/ui';

export default function ConfirmCode() {
  const { getConfirmCode } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useThemeConfig();
  useSoftKeyboardEffect();

  useEffect(() => {
    getConfirmCode();
  }, [getConfirmCode]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Icon
          name="close"
          fill={theme.colors.text}
          onPress={() => router.back()}
          style={styles.backContainer}
        />
        <View style={styles.optContainer}>
          <Text testID="confirmCodeText" style={styles.description}>
            {t('screens.confirmCode.description')}
          </Text>
          <OTP
            route={
              navigation.getState().routes[navigation.getState().index - 1]
                ?.name
            }
          />
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = {
  container: tailwind`flex-1`,
  backContainer: tailwind`pt-20 absolute pl-10`,
  optContainer: tailwind`flex-1 items-center justify-center`,
  description: tailwind`text-5 w-50 text-center`,
};
