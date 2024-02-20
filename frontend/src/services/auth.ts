import { client } from '../config/client';
import { appStorage } from '../config/storage';
import { IRegisterUser, IUser } from '../types/user';

export const authService = {
  async login(email: string, password: string) {
    const res = await client.post('/auth/login', { email, password });
    appStorage.setItem('token', res.data.token);
    appStorage.setItemJSON('user', res.data.user);
    return res.data;
  },

  logout() {
    appStorage.removeItem('token');
    appStorage.removeItem('user');
  },

  check() {
    if (!appStorage.getItem('token')) {
      return false;
    }
    return true;
  },

  getUser() {
    if (!this.check()) {
      return null;
    }
    return appStorage.getItemJSON('user') as IUser;
  },

  async signup(payload: FormData) {
    const res = await client.post('/auth/register', payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },);
    // if (res.status === 201) {
    // this.login(payload.get('email') as string, payload.get('password') as string);
    // }
    return { data: res.data, status: res.status };
  },
};
