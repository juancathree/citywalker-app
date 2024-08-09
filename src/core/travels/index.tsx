import { create } from 'zustand';

import type { Travel } from '@/types/travel';

import { createSelectors } from '../utils';
import { getting } from './utils';

interface TravelsState {
  travels: Map<string, Travel>;
  status: 'fetching' | 'fetched' | 'error';
  addTravel: (travel: Travel) => void;
  getTravels: () => Map<string, Travel>;
  getTravel: (id: string) => Travel | undefined;
}

const _useTravels = create<TravelsState>((set, get) => ({
  status: getting() ? 'fetched' : 'error',
  travels: getting(),
  addTravel: (travel: Travel) => {
    set({
      travels: new Map(get().travels.set(travel.city, travel)),
      status: 'fetched',
    });
  },
  getTravels: () => {
    return get().travels;
  },
  getTravel: (id: string) => {
    return get().travels.get(id);
  },
}));

export const useTravels = createSelectors(_useTravels);

export const addTravel = (travel: Travel) =>
  _useTravels.getState().addTravel(travel);

export const getTravels = () => _useTravels.getState().getTravels();

export const getTravel = (id: string) => _useTravels.getState().getTravel(id);
