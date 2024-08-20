import { useQuery } from '@tanstack/react-query';

import type { User } from '@/types/user';

import { client } from '../common';

const fetch = async (user: User) => {
  const response = await client.post('user/code', user);
  return response.data as User;
};

export const GetCodeConfirmation = (user: User) => {
  return useQuery({
    queryKey: ['codeConfirmation'],
    queryFn: () => fetch(user),
    gcTime: 0,
  });
};
