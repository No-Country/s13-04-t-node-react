import { Route, Routes } from 'react-router-dom';
import {
  AddNewParking,
  Home,
  Landing,
  Login,
  MenuRegister,
  NotFound,
  Register,
  AddNewVehicule,
  CreatedAccount,

} from './LazyRoutes';

export default function NoAuthRouter () {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/menu/registro' element={<MenuRegister />} />
      <Route path='/menu/registro/estacionamiento' element={<AddNewParking />} />
      <Route path='/home' element={<Home />} />
      <Route path='/nuevo-vehiculo' element={<AddNewVehicule />} />
      <Route path='/cuenta-creada' element={<CreatedAccount />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
