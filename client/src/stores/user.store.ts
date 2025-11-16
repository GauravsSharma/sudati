import { create } from "zustand";

type UserState = {
  user: User | null;
  token: string|null;
  setAuth: (user: User,token:string) => void;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setAuth: (user,token) => set({ user,token }),
  setUser: (user) => set({ user }),
}));
