import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import RegisterForm from '@/components/form/registerForm';
import { SocialNetworks } from '@/components/form/socialNetworks';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useThemeConfig } from '@/core/useThemeConfig';
import { Background, Divider, Icon } from '@/ui';

export default function Register() {
  const router = useRouter();
  const theme = useThemeConfig();
  const { t } = useTranslation();
  useSoftKeyboardEffect();

  return (
    <Background>
      <SafeAreaView style={styles.containerCenter}>
        <Icon
          name="back"
          fill={theme.colors.text}
          onPress={() => router.back()}
          style={styles.backContainer}
        />
        <View style={styles.containerCenter}>
          <Text
            testID="title"
            style={[tailwind`text-[${theme.colors.text}]`, styles.title]}
          >
            {t('screens.register.title')}
          </Text>
          <View style={styles.formContainer}>
            <RegisterForm />
            <Divider style={styles.divider} />
            <SocialNetworks style={styles.socialNetworks} />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = {
  containerCenter: tailwind`flex-1 items-center justify-center`,
  backContainer: tailwind`self-start pl-10 pt-10`,
  formContainer: tailwind`w-80 mt-10 items-center`,
  socialNetworks: tailwind`mt-10`,
  title: tailwind`text-14 self-start`,
  divider: tailwind`mt-5`,
};
