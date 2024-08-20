import { getItem, removeItem, setItem } from '@/core/storage';
import type { User } from '@/types/user';

const TOKEN = 'jwt';
const USER = 'user';

export const getToken = () => getItem<string>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: string) => setItem<string>(TOKEN, value);

export const getUser = () => getItem<User>(USER);
export const setUser = (value: User) => setItem<User>(USER, value);
