import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import type { User } from '@/types/user';

import { client } from '../common';

type Response = User;

export const useAskCode = createMutation<Response, User, AxiosError>({
  mutationFn: async (data) =>
    client({
      url: 'user/code',
      method: 'POST',
      data: data,
    }).then((response) => response.data),
});
