import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './LazyRoutes';
import { MyDataDriver } from '../pages/MyDataDriver';
import { DriverEmail } from '../pages/DriverEmail';
import { DriverPhone } from '../pages/DriverPhone';
import { DriverPassword } from '../pages/DriverPassword';
import { MyVehicles } from '../pages/MyVehicles';
import { FormDriver } from '../pages/FormDriver';

export default function AuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mis-datos' element={<MyDataDriver />} />
      <Route path='/editar-email' element={<DriverEmail />} />
      <Route path='/editar-celular' element={<DriverPhone />} />
      <Route path='/editar-password' element={<DriverPassword />} />
      <Route path='/mis-vehiculos' element={<MyVehicles />} />
      <Route path='/agregar-vehiculo' element={<FormDriver />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
