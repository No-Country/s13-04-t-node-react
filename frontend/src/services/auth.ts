import { client } from '../config/client';
import { appStorage } from '../config/storage';
import { IRegisterUser, IUser } from '../types/user';

export const authService = {
  async signup(payload: IRegisterUser) {
    await client.post('/auth/register', payload);
    return this.login(payload.email, payload.password);
  },

  async login(email: string, password: string) {
    const res = await client.post<{ token: string; user: IUser }>(
      '/auth/login',
      { email, password }
    );
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

  async patchUser(partialUser: Partial<IUser>) {
    const res = await client.patch<{ user: IUser }>('/users', partialUser);
    appStorage.setItemJSON('user', res.data.user);
  },
};
