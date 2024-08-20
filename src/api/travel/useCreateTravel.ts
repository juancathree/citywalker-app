import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { getToken } from '@/core/store/auth/utils';
import type { Travel } from '@/types/travel';

import { client } from '../common';

type Response = {
  travel: Travel;
};

export const useCreateTravel = createMutation<Response, Travel, AxiosError>({
  mutationFn: async (data) =>
    client({
      url: 'travels/create',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }).then((response) => response.data),
});
