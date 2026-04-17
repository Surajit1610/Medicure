import { create } from 'zustand';
import { Models } from 'appwrite';

interface ClinicState {
  user: Models.User<Models.Preferences> | null;
  isAuthenticated: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useClinicStore = create<ClinicState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
