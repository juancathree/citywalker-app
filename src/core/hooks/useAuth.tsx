import { useRouter } from 'expo-router';
import { t } from 'i18next';
import Toast from 'react-native-toast-message';

import { GetCodeConfirmation, Login, Register } from '@/api';
import type { User } from '@/types';

import { useAuthStore } from '../store';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    setUser,
    signIn,
    confirmCode,
    setConfirmCode,
    signOut,
    status,
  } = useAuthStore();
  const {
    mutate: loginAPI,
    isPending: loginIsPending,
    isError: loginIsError,
  } = Login();
  const {
    mutate: registerAPI,
    isPending: registerIsPending,
    isError: registerIsError,
  } = Register();

  const login = (userCredentials: User) => {
    loginAPI(userCredentials, {
      onSuccess: (response) => {
        signIn(response.jwt, response.user);
        router.push('/');
      },
      onError: (err) => {
        const errorCause =
          err.response?.status === 401 ? 'wrongCredentials' : 'serverError';
        Toast.show({
          type: 'error',
          text1: t(`toast.login.${errorCause}Title`)!,
          text2: t(`toast.login.${errorCause}Description`)!,
          topOffset: 80,
        });
      },
    });
  };

  const register = (newUser: User) => {
    registerAPI(newUser, {
      onSuccess: (response: any) => {
        signIn(response.jwt, response.user);
        router.push('/');
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred',
          topOffset: 80,
        });
      },
    });
  };

  const getConfirmCode = () => {
    const { data, isError } = GetCodeConfirmation(user);
    if (data) {
      setConfirmCode(data.confirmCode!);
    } else if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred',
        topOffset: 80,
      });
      router.back();
    }
  };

  return {
    status,
    user,
    setUser,
    confirmCode,
    setConfirmCode,
    login,
    register,
    signOut,
    loginIsPending,
    loginIsError,
    registerIsError,
    registerIsPending,
    getConfirmCode,
  };
};
