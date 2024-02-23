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
const AddNewVehicule: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-driver/AddNewVehicule')
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
const ParkingAvailability: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register-parking/ParkingAvailability')
);
const GarageResults: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/home-driver/GarageResults')
);
const AccountCreated: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/register/AccountCreated')
);

export {
  Landing,
  NotFound,
  Login,
  Register,
  Home,
  AddNewVehicule,
  AddNewParking,
  ParkingSchedule,
  ParkingLotPhotos,
  GarageResults,
  ParkingAvailability,
  AccountCreated,
};
