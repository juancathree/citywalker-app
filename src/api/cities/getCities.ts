import { locale } from 'expo-localization';
import Toast from 'react-native-toast-message';

import { getToken } from '@/core/store/auth/utils';
import type { City } from '@/types/city';

import { client } from '../common';

export const GetCities = async () => {
  try {
    const response = await client.get(`cities/all/${locale.split('-')[0]}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.cities as City[];
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'error',
    });
  }
};
