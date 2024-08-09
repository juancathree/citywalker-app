import { getItem, setItem } from '@/core/storage';
import type { Travel } from '@/types/travel';

const TRAVELS = 'travels';

export const getting = () => JSON.parse(getItem<string>(TRAVELS));
export const saving = (travels: Travel[]) =>
  setItem<string>(TRAVELS, JSON.stringify(travels));
