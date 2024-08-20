import { useRouter } from 'expo-router';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useAuth } from '@/core';
import type { User } from '@/types';

import { Form } from './form/form';
import { Modal } from './modal';

type Props = {
  isVisible: boolean;
  hideModal: () => void;
};

const schema = yup.object({
  email: yup
    .string()
    .required(i18next.t('schema.email.required')!)
    .email(i18next.t('schema.email.invalid')!),
});

export function ForgotPasswordModal({ isVisible, hideModal }: Props) {
  const router = useRouter();
  const { setUser } = useAuth();
  const { t } = useTranslation();

  const onInsertEmail = (data: User) => {
    setUser(data);
    router.push('/confirmCode');
  };

  return (
    <Modal isVisible={isVisible} hideModal={hideModal}>
      <Form
        data={{ email: '' } as User}
        schema={schema}
        onSubmit={onInsertEmail}
        buttonText={t('components.forgotPassword.send')}
      />
    </Modal>
  );
}
