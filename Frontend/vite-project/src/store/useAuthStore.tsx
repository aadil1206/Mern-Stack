import { create } from "zustand";
import {axiosInstance} from "../lib/axios"; // adjust import

interface AuthUser {
  id: string;
  name: string;
  email: string;
  // add other fields as per your backend response
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  setAuthUser: (user: AuthUser | null) => void;
  setIsSigningUp: (status: boolean) => void;
  setIsLoggingIn: (status: boolean) => void;
  setIsUpdatingProfile: (status: boolean) => void;
  setIsCheckingAuth: (status: boolean) => void;

  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set,) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  setAuthUser: (user) => set({ authUser: user }),
  setIsSigningUp: (status) => set({ isSigningUp: status }),
  setIsLoggingIn: (status) => set({ isLoggingIn: status }),
  setIsUpdatingProfile: (status) => set({ isUpdatingProfile: status }),
  setIsCheckingAuth: (status) => set({ isCheckingAuth: status }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: res.data });
   
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


}));
