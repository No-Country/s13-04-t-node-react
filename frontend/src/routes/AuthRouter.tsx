import { Route, Routes } from 'react-router-dom';
import { AddNewParking, CreatedAccount, Home, NotFound, ParkingLotPhotos, ParkingSchedule } from './LazyRoutes';
import { MyDataDriver } from '../pages/data-driver/MyDataDriver';
import { DriverEmail } from '../pages/data-driver/DriverEmail';
import { DriverPhone } from '../pages/data-driver/DriverPhone';
import { DriverPassword } from '../pages/data-driver/DriverPassword';
import { MyVehicles } from '../pages/menu-my-vehicles/MyVehicles';
import { FormDriver } from '../pages/menu-my-vehicles/FormDriver';
import Booking from '../pages/booking-driver/Booking';
import GarageResults from '../pages/home-driver/GarageResults';
import AddNewVehicule from '../pages/register-driver/AddNewVehicule';

export default function AuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mis-datos' element={<MyDataDriver />} />
      <Route path='/reservar/:idGaraje' element={<Booking />} />
      <Route path='/editar-email' element={<DriverEmail />} />
      <Route path='/editar-celular' element={<DriverPhone />} />
      <Route path='/editar-password' element={<DriverPassword />} />
      <Route path='/mis-vehiculos' element={<MyVehicles />} />
      <Route path='/agregar-vehiculo' element={<FormDriver />} />
      <Route path='/resultados-garages' element={<GarageResults />} />
      <Route path='/nuevo-vehiculo' element={<AddNewVehicule />} />
      <Route path='/registro'>
        <Route path='conductor' element={<AddNewVehicule />} />
        <Route path='estacionamiento' element={<AddNewParking />} />
        <Route path='cuenta-creada' element={<CreatedAccount />} />
      </Route>     
      <Route path='/cuenta-creada' element={<CreatedAccount />} />
      <Route path='/horario-estacionamiento' element={<ParkingSchedule />} />
      <Route path='/fotos-estacionamiento' element={<ParkingLotPhotos />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
