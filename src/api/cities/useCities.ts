import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { getToken } from '@/core/auth/utils';
import type { City } from '@/types/city';

import { client } from '../common';

type Variables = { lng: string };
type Response = {
  cities: City[];
};

export const useCities = createQuery<Response, Variables, AxiosError>({
  queryKey: ['cities'],
  fetcher: (variables) => {
    return client
      .get(`cities/all/${variables.lng}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  },
});
