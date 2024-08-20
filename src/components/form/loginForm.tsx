import i18next, { t } from 'i18next';
import type { PropsWithChildren } from 'react';
import React from 'react';
import * as yup from 'yup';

import { useAuth } from '@/core';
import type { User } from '@/types';

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
});

type Props = PropsWithChildren<{}>;

export default function LoginForm({ children }: Props) {
  const { login, loginIsPending } = useAuth();

  const user: User = {
    email: '',
    password: '',
  };

  const onSubmit = (userCredentials: User) => {
    login(userCredentials);
  };

  return (
    <Form
      data={user}
      schema={schema}
      onSubmit={onSubmit}
      buttonText={t('screens.login.loginButton')}
      isLoading={loginIsPending}
    >
      {children}
    </Form>
  );
}
