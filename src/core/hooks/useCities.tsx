import { useQuery } from '@tanstack/react-query';

import { GetCities } from '@/api';

import { useCitiesStore } from '../store/cities';

export const useCities = () => {
  const {
    setCacheExpiry,
    isCacheValid,
    setCities,
    getCities,
    filter,
    setFilter,
  } = useCitiesStore();

  const { data, isPending, isError } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const cities = await GetCities();
      const expiryDate = new Date(new Date().setDate(new Date().getDate() + 7));
      setCities(cities!);
      setCacheExpiry(expiryDate);
      return cities;
    },
    initialData: () => {
      const cachedCities = getCities();
      return isCacheValid() && cachedCities ? cachedCities : undefined;
    },
    enabled: !isCacheValid(),
    staleTime: Infinity,
  });

  return { data, isPending, isError, filter, setFilter };
};
