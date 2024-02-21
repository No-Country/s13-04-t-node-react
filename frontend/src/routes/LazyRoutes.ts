import { lazy } from 'react';

const Login: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/auth/Login')
);
const Register: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register/Register')
);
const Landing: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/landing/Landing')
);
const Home: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/home/Home')
);
const MenuRegister: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register/MenuRegister')
);
const AddNewVehicule: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-driver/AddNewVehicule')
);
const CreatedAccount: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register/CreatedAccount')
);
const NotFound: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/not-found/NotFound')
);
const AddNewParking: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-parking/AddNewParking')
);
const ParkingSchedule: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-parking/ParkingSchedule')
);
const ParkingLotPhotos: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-parking/ParkingLotPhotos')
);

export {
  Landing,
  NotFound,
  Login,
  Register,
  Home,
  MenuRegister,
  AddNewVehicule,
  CreatedAccount,
  AddNewParking,
  ParkingSchedule,
  ParkingLotPhotos,
};
