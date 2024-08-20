import { create } from 'zustand';

import type { Travel } from '@/types/travel';

import { createSelectors } from '../utils';
import { getting, saving } from './utils';

interface TravelsState {
  travels: Map<string, Travel>;
  addTravel: (travel: Travel) => void;
  getTravels: () => Map<string, Travel>;
  getTravel: (id: string) => Travel;
}

const _useTravels = create<TravelsState>((set, get) => ({
  travels: getting(),
  addTravel: (travel: Travel) => {
    const newMap = new Map(get().travels);
    newMap.set(travel.city, travel);
    set({
      travels: newMap,
    });
    saving(get().travels);
  },
  getTravels: () => {
    return get().travels;
  },
  getTravel: (id: string) => {
    return get().travels.get(id)!;
  },
}));

export const useTravels = createSelectors(_useTravels);

export const addTravel = (travel: Travel) =>
  _useTravels.getState().addTravel(travel);

export const getTravels = () => _useTravels.getState().getTravels();

export const getTravel = (id: string) => _useTravels.getState().getTravel(id);
