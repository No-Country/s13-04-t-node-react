import { client } from '../config/client';
import { appStorage } from '../config/storage';
import { IUser } from '../types/user';

export const userService = {
  async patchUser(partialUser: Partial<IUser>) {
    const res = await client.patch<{ user: IUser }>('/users', partialUser);
    appStorage.setItemJSON('user', res.data.user);
  },
};
