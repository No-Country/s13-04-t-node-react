import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './LazyRoutes';
import { MyDataDriver } from '../pages/data-driver/MyDataDriver';
import { DriverEmail } from '../pages/data-driver/DriverEmail';
import { DriverPhone } from '../pages/data-driver/DriverPhone';
import { DriverPassword } from '../pages/data-driver/DriverPassword';
import { MyVehicles } from '../pages/menu-my-vehicles/MyVehicles';
import { FormDriver } from '../pages/menu-my-vehicles/FormDriver';

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
