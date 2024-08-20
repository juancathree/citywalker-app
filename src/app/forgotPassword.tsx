import { useRouter } from 'expo-router';
import { t } from 'i18next';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import tailwind from 'twrnc';
import * as yup from 'yup';

import { Form } from '@/components';
import { useThemeConfig } from '@/core';
import type { User } from '@/types';
import { Background, Icon, Text } from '@/ui';

const schema = yup.object({
  password: yup.string().required(t('schema.password.required')!),
  confirmPassword: yup
    .string()
    .required(t('schema.password.bothMustMatch')!)
    .oneOf([yup.ref('password')], t('schema.password.bothMustMatch')!),
});

export default function ForgotPassword() {
  const router = useRouter();
  const theme = useThemeConfig();

  const userWithNewPass: User = {
    password: '',
    confirmPassword: '',
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Icon
          name="close"
          fill={theme.colors.text}
          onPress={() => router.dismissAll()}
          style={styles.backContainer}
        />
        <View style={styles.changePasswordContainer}>
          <Text testID="confirmCodeText" style={styles.description}>
            {t('screens.forgotPassword.description')}
          </Text>
          <View style={styles.formContainer}>
            <Form
              data={userWithNewPass}
              buttonText="Change password"
              schema={schema}
              //TODO: add onSubmit function
              onSubmit={() => { }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = {
  container: tailwind`flex-1`,
  backContainer: tailwind`pt-20 absolute pl-10`,
  changePasswordContainer: tailwind`flex-1 items-center justify-center`,
  description: tailwind`text-5 w-50 text-center`,
  formContainer: tailwind`mt-10 w-80 items-center`,
};
