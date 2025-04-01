import {
  LoginProps
} from '@/types/auth';
import api from './base.service';

export const login = async (data: LoginProps & { trial_count: number }) => {
  return await api.post('/auth/login', data);
};

