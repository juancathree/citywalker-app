import { create } from 'zustand';

import type { User } from '@/types/user';

import { createSelectors } from '../utils';
import { getToken, getUser, removeToken, setToken, setUser } from './utils';

type AuthState = {
  token: string | null;
  user: User;
  confirmCode: string | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setConfirmCode: (code: string) => void;
  hydrate: () => void;
};

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  user: {},
  confirmCode: null,
  token: null,
  signIn: (token, user) => {
    setToken(token);
    setUser(user);
    set({ status: 'signIn', token, user });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null, user: {} });
  },
  setUser: (user) => {
    set({ user });
  },
  setToken: (token) => {
    set({ token });
  },
  setConfirmCode: (code) => {
    set({ confirmCode: code });
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

export const useAuthStore = createSelectors(_useAuth);

export const hydrateAuth = () => _useAuth.getState().hydrate();
