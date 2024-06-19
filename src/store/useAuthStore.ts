import { create } from 'zustand'

import type { User } from 'src/types/user'

export type AuthState = {
  jwt: string | null | undefined
  user: User | null | undefined
  isLoading: boolean
  isFetched: boolean
  error: boolean
  setJWT: (_value: string | null | undefined) => void
  setUser: (_value: User | null | undefined) => void
  setIsLoading: (_value: boolean) => void
  setIsFetched: (_value: boolean) => void
  setError: (_value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  user: null,
  isLoading: false,
  isFetched: false,
  error: false,
  setJWT: (value: string | null | undefined) => set({ jwt: value }),
  setUser: (value: User | null | undefined) => set({ user: value }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setIsFetched: (value: boolean) => set({ isFetched: value }),
  setError: (value: boolean) => set({ error: value })
}))
