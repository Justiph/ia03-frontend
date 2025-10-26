import { useMutation } from '@tanstack/react-query';
import { api } from './client';

export type RegisterPayload = { email: string; password: string };
export type RegisterResponse = { message: string; user: { id: string; email: string; createdAt: string } };

export function useRegister() {
  return useMutation<RegisterResponse, any, RegisterPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post('/user/register', payload);
      return data;
    },
  });
}
