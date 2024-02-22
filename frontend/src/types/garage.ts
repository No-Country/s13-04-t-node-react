export interface IWelcome {
  garages: IGarage[];
}

export interface IGarage {
  id: string;
  idUser: string;
  name: string;
  address: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  capacity: number;
  amount: number;
  price: number;
  whitConfirmation: boolean;
  available: boolean;
  coordinates: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
}

export interface Image {
  id: string;
  route: string;
}

export interface IGarageSearchParams {
  location: string;
  startDate: string;
  endDate: string;
}

export interface ISearchGarage {
  id: string;
  name: string;
  address: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  capacity: number;
  amount: number;
  price: number;
  whitConfirmation: boolean;
  available: boolean;
  coordinates: string;
  rating: null;
  user: User;
}

export interface User {
  id: string;
  name: string;
  identity: string;
  email: string;
  phone: string;
  role: string;
  rating: null;
  image: null;
}
