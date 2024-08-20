import { create } from 'zustand';

import type { City } from '@/types/city';

import { createSelectors } from '../utils';
import {
  gettingCacheExpiry,
  gettingCities,
  savingCacheExpiry,
  savingCities,
} from './utils';

interface CitiesState {
  filter: string;
  cacheExpiry: Date;
  setFilter: (filter: string) => void;
  setCacheExpiry: (expiryDate: Date) => void;
  isCacheValid: () => boolean;
  setCities: (cities: City[]) => void;
  getCities: () => City[];
}

const _useCities = create<CitiesState>((set) => ({
  filter: '',
  cacheExpiry: gettingCacheExpiry(),
  setFilter: (filter) => {
    set({ filter });
  },
  setCacheExpiry: (expiryDate) => {
    savingCacheExpiry(expiryDate);
    set({ cacheExpiry: expiryDate });
  },
  isCacheValid: () => {
    const cacheExpiry = gettingCacheExpiry();
    return cacheExpiry && new Date() < cacheExpiry;
  },
  setCities: (cities) => {
    savingCities(cities);
  },
  getCities: () => {
    return gettingCities();
  },
}));

export const useCitiesStore = createSelectors(_useCities);
