import { getItem, setItem } from '@/core/storage';
import type { Travel } from '@/types/travel';

const TRAVELS = 'travels';

const convertToMap = (obj: any): Map<string, Travel> => {
  const map = new Map<string, Travel>();
  Object.keys(obj).forEach((key) => {
    map.set(key, obj[key]);
  });
  return map;
};

export const getting = (): Map<string, Travel> => {
  const storedData = getItem<string>(TRAVELS);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return convertToMap(parsedData);
  }
  return new Map<string, Travel>();
};

export const saving = (travels: Map<string, Travel>) => {
  const travelObject = Object.fromEntries(travels);
  setItem<string>(TRAVELS, JSON.stringify(travelObject));
};
