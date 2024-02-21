import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './LazyRoutes';
import { MyDataDriver } from '../pages/MyDataDriver';
import { DriverEmail } from '../pages/DriverEmail';
import { DriverPhone } from '../pages/DriverPhone';
import { DriverPassword } from '../pages/DriverPassword';
import { MyVehicles } from '../pages/MyVehicles';
import { FormDriver } from '../pages/FormDriver';
import Booking from '../pages/Booking';

export default function AuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mis-datos' element={<MyDataDriver />} />
      <Route path='/reservar' element={<Booking />} />
      <Route path='/editar-email' element={<DriverEmail />} />
      <Route path='/editar-celular' element={<DriverPhone />} />
      <Route path='/editar-password' element={<DriverPassword />} />
      <Route path='/mis-vehiculos' element={<MyVehicles />} />
      <Route path='/agregar-vehiculos' element={<FormDriver />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
