import { getItem, setItem } from '@/core/storage';
import type { City } from '@/types/city';

const CITIES = 'cities';
const CACHEEXPIRY = 'cacheExpiry';

export const gettingCities = (): City[] => JSON.parse(getItem<string>(CITIES));
export const savingCities = (cities: City[]) =>
  setItem<string>(CITIES, JSON.stringify(cities));

export const gettingCacheExpiry = (): Date =>
  new Date(getItem<string>(CACHEEXPIRY));
export const savingCacheExpiry = (date: Date) =>
  setItem<string>(CACHEEXPIRY, date.toISOString());
