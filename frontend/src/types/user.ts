export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  identity: string;
  phone: string;
  role: string;
  rating: null;
  image: null;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  identity: string;
  phone: string;
  role: string;
  image: string;
}
