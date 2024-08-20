import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { ForgotPasswordModal } from '@/components';
import LoginForm from '@/components/form/loginForm';
import { SocialNetworks } from '@/components/form/socialNetworks';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { Background, Divider, Link, Text, Title } from '@/ui';

export default function Login() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { t } = useTranslation();
  useSoftKeyboardEffect();

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Title style={styles.center} />
        <View style={styles.formContainer}>
          <LoginForm>
            <Link
              text={t('screens.login.forgotPassword')}
              action={showModal}
              style={styles.link}
              testID="forgotPasswordLink"
            />
          </LoginForm>
          <Divider style={styles.divider} />
          <SocialNetworks style={styles.socialNetworks} />
          <View style={styles.registerContainer}>
            <Text style={styles.fontBold}>{t('screens.login.notAccount')}</Text>
            <Link
              action={() => router.push('/register')}
              text={t('screens.login.register')}
              testID="registerLink"
            />
          </View>
          <ForgotPasswordModal
            isVisible={isModalVisible}
            hideModal={hideModal}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = {
  container: tailwind`flex-1 items-center justify-center`,
  center: tailwind`items-center`,
  formContainer: tailwind`mt-20 w-80 items-center`,
  link: tailwind`self-start`,
  divider: tailwind`mt-5`,
  socialNetworks: tailwind`mt-10`,
  registerContainer: tailwind`flex-row gap-2 self-center mt-10`,
  fontBold: tailwind`font-bold`,
};
