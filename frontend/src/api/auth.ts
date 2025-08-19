import apiClient from './client';
import { AuthResponse } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/signup', { email, password, name });
    return response.data;
  }
};