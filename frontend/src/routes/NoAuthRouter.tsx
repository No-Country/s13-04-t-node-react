import { Route, Routes } from 'react-router-dom';
import {
  AddNewParking,
  Landing,
  Login,
  MenuRegister,
  NotFound,
  Register,
  AddNewVehicule,
  CreatedAccount,
  ParkingSchedule,
  ParkingLotPhotos,
} from './LazyRoutes';

export default function NoAuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro'>
        <Route index element={<MenuRegister />} />
        <Route path='usuario/:type' element={<Register />} />
        <Route path='conductor' element={<AddNewVehicule />} />
        <Route path='estacionamiento' element={<AddNewParking />} />
        <Route path='cuenta-creada' element={<CreatedAccount />} />
      </Route>
      <Route path='/nuevo-vehiculo' element={<AddNewVehicule />} />
      <Route path='/cuenta-creada' element={<CreatedAccount />} />
      <Route path='/horario-estacionamiento' element={<ParkingSchedule />} />
      <Route path='/fotos-estacionamiento' element={<ParkingLotPhotos />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
