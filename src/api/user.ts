import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { api, isAuthenticated } from './client';
import { useAuth } from '../context/AuthContext';

// Types
export type RegisterPayload = { email: string; password: string };
export type RegisterResponse = {
  message: string;
  user: { id: string; email: string };
};
export type LoginPayload = { email: string; password: string };
export type AuthResponse = { 
  accessToken: string; 
  refreshToken: string;
  user: { 
    id: string; 
    email: string; 
    createdAt: string;
  }; 
};
export type UserProfile = {
  id: string;
  email: string;
  createdAt: string;
};

// Mutations
export function useRegister() {
  return useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post('/user/register', payload);
      return data;
    },
  });
}

export function useLogin() {
  const { login } = useAuth();
  
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post('/auth/login', payload);
      return data;
    },
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken);
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
    },
  });
}

// Queries
export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/auth/profile');
      return data;
    },
    enabled: isAuthenticated(),
  });
}
