"use strict";
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 1. Initial global state values
  token: null,
  isAuthenticated: false,
  user: null,

  // 2. Global actions (functions) to update the state
  loginSuccess: (accessToken, userData) => set({
    token: accessToken,
    isAuthenticated: true,
    user: userData
  }),

  logout: () => set({
    token: null,
    isAuthenticated: false,
    user: null
  }),
}));

export default useAuthStore;