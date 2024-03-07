import { IUser } from "./user";

export interface IVehicule {

    idUser: string;
    brand: string;
    model: string;
    plate: string;
    color: string;
}

export interface IVehiculeUser {

  idUser: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  user: IUser;
}


export interface ICar {
  id: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface Car {
  brand: string;
  color: string;
  id: string;
  model: string;
  plate: string;
  user_id: string;
}
