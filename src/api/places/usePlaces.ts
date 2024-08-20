import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { getToken } from '@/core/store/auth/utils';
import type { Place } from '@/types/place';

import { client } from '../common';

type Variables = { id: string };
type Response = {
  places: Place[];
};

export const usePlaces = createQuery<Response, Variables, AxiosError>({
  queryKey: ['places'],
  fetcher: (variables) => {
    return client
      .get(`places/${variables.id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  },
});
