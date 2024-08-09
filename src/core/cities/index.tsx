import { create } from 'zustand';

import type { City } from '@/types/city';

import { createSelectors } from '../utils';
import { getting, saving } from './utils';

interface CitiesState {
  cities: City[];
  status: 'fetching' | 'fetched' | 'error';
  setCities: (cities: City[]) => void;
  getCities: () => City[];
}

const _useCities = create<CitiesState>((set, get) => ({
  status: getting() ? 'fetched' : 'error',
  cities: getting(),
  setCities: (cities: City[]) => {
    saving(cities);
    set({ cities, status: 'fetched' });
  },
  getCities: () => {
    return get().cities;
  },
}));

export const useCities = createSelectors(_useCities);

export const setCities = (cities: City[]) =>
  _useCities.getState().setCities(cities);

export const getCities = () => _useCities.getState().getCities();
