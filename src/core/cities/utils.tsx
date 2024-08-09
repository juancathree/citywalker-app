import { getItem, setItem } from '@/core/storage';
import type { City } from '@/types/city';

const CITIES = 'cities';

export const getting = () => JSON.parse(getItem<string>(CITIES));
export const saving = (cities: City[]) =>
  setItem<string>(CITIES, JSON.stringify(cities));
