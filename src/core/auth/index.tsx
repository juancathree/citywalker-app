import { create } from 'zustand';

import type { User } from '@/types/user';

import { createSelectors } from '../utils';
import { getToken, getUser, removeToken, setToken, setUser } from './utils';

interface AuthState {
  token: string | null;
  status: 'idle' | 'signOut' | 'signIn';
  user: User;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  setUser: (user: User) => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: getToken() ? 'signIn' : 'signOut',
  user: getUser(),
  token: null,
  signIn: (token, user) => {
    setToken(token);
    setUser(user);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  setUser: (user) => {
    setUser(user);
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const user = getUser();
      if (userToken !== null && user !== null) {
        get().signIn(userToken, user);
      } else {
        get().signOut();
      }
    } catch (e) {
      get().signOut();
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();

export const signIn = (token: string, user: User) =>
  _useAuth.getState().signIn(token, user);

export const hydrateAuth = () => _useAuth.getState().hydrate();
