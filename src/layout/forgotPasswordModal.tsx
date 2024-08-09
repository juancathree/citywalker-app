import { useRouter } from 'expo-router';
import i18next from 'i18next';
import React from 'react';
import * as yup from 'yup';

import Modal from '@/components/modal';
import { setUser } from '@/core/auth/utils';
import type { User } from '@/types/user';

import { Form } from './form';

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

export default function ForgotPasswordModal({ isVisible, hideModal }: Props) {
  const router = useRouter();

  const onChangePassword = (data: User) => {
    setUser(data);
    router.push('/confirmCode');
  };

  return (
    <Modal isVisible={isVisible} hideModal={hideModal}>
      <Form
        data={{ email: '' } as User}
        schema={schema}
        onSubmit={onChangePassword}
        buttonText="Send"
      />
    </Modal>
  );
}
