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
