import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import type { User } from '@/types/user';

import { client } from '../common';

type Response = {
  user: User;
  jwt: string;
};

export const Login = createMutation<Response, User, AxiosError>({
  mutationFn: async (data) =>
    client({
      url: 'user/login',
      method: 'POST',
      data: data,
    }).then((response) => response.data),
});
