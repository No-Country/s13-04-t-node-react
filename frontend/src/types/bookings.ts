export interface IBookingResponse {
    bookings: IBooking[];
  }
  
  export interface IBooking {
    id: string;
    date_start: string;
    date_end: string;
    status: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    id_car: string;
    id_garage: string;
    garage: IGarage;
    car: IVehicleUser;
   // bookings: IBooking[]; 
  }
  
  export interface IGarage {
    id: string;
    id_user: string; 
    name: string;
    address: string;
  }
  
  export interface IVehicle {
    id: string;
    brand: string;
    model: string;
    plate: string;
    color: string;
  }

  export interface IVehicleUser {
    id: string;
    brand: string;
    model: string;
    plate: string;
    color: string;
    user: IUser
  }
  
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
  