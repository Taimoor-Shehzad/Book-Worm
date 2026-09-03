import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { router } from "expo-router";
import { API_URL } from "../constants/api";
  // Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: null,
  token: null,

  register: async(username,email,password)=>{
    set({isLoading: true})
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
        }
      )

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message || 'Something went wrong';
        throw new Error(errorMessage);
      }

      try {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);
      } catch (storageError) {
        console.warn("AsyncStorage unavailable, continuing without persisted session:", storageError.message);
      }

      set({ user: data.user, token: data.token, isLoading: false });

      router.navigate('/(tabs)/home')
      return {
        success: true,
      };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  login: async(email,password)=>{
    set({isLoading: true})
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
        }
      )

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message || 'Something went wrong';
        throw new Error(errorMessage);
      }

      try {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);
      } catch (storageError) {
        console.warn("AsyncStorage unavailable, continuing without persisted session:", storageError.message);
      }

      set({ user: data.user, token: data.token, isLoading: false });

      router.navigate('/(tabs)/home')
      return {
        success: true,
      };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  checkAuth: async()=>{
    try {
      const token=await AsyncStorage.getItem('token')
      const userJson=await AsyncStorage.getItem('user')
      const user= userJson? JSON.parse(userJson):null

      set({token,user})
      
    } catch (error) {
      console.log('Auth check failed', error)
    }
  },

  logout: async()=>{
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("user")
    set({token: null,user: null})
  }

}));
