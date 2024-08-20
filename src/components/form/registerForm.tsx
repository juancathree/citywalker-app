import { useRouter } from 'expo-router';
import i18next, { t } from 'i18next';
import React from 'react';
import * as yup from 'yup';

import { useAuth } from '@/core/hooks/useAuth';
import type { User } from '@/types/user';

import { Form } from './form';

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

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = (user: User) => {
    setUser(user);
    router.navigate('/confirmCode');
  };

  const user: User = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Form
      data={user}
      schema={schema}
      onSubmit={onSubmit}
      buttonText={t('screens.register.registerButton')}
    />
  );
}
