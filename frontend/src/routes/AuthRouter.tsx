import { Route, Routes } from 'react-router-dom';
// HOME DRIVER
import { Home } from '../pages/home/Home';
import { GarageResults } from '../pages/home-driver/GarageResults';
// REGISTER DRIVER
import { AddNewVehicule } from '../pages/register-driver/AddNewVehicule';
// REGISTER PARKING
import { AddNewParking } from '../pages/register-parking/AddNewParking';
import { ParkingAvailability } from '../pages/register-parking/ParkingAvailability';
import { ParkingSchedule } from '../pages/register-parking/ParkingSchedule';
import { ParkingLotPhotos } from '../pages/register-parking/ParkingLotPhotos';
// DATA DRIVER
import { MyDataDriver } from '../pages/data-driver/MyDataDriver';
import { DriverEmail } from '../pages/data-driver/DriverEmail';
import { DriverPhone } from '../pages/data-driver/DriverPhone';
import { DriverPassword } from '../pages/data-driver/DriverPassword';
// VEHICLE MENU
import { MyVehicles } from '../pages/menu-my-vehicles/MyVehicles';
import { FormDriver } from '../pages/menu-my-vehicles/FormDriver';
// BOOKING DRIVER
import Booking from '../pages/booking-driver/Booking';
import { CarDateReservation } from '../pages/booking-driver/CarDateReservation';
import { ReservationConfirmation } from '../pages/booking-driver/ReservationConfirmation';
// RESERVATION PAYMENT
import { PaymentPage } from '../pages/reservation-payment/PaymentPage';
// OTHERS
import { AccountCreated } from '../pages/register/AccountCreated';
import { NotFound } from '../pages/not-found/NotFound';

export default function AuthRouter() {
  return (
    <Routes>
      {/* HOME DRIVER */}
      <Route path='/' element={<Home />} />
      <Route path='/resultados-garages' element={<GarageResults />} />

      {/* REGISTER DRIVER */}
      <Route path='/registro'>
        <Route path='nuevo-vehiculo' element={<AddNewVehicule />} />
      </Route>

      {/* REGISTER PARKING */}
      <Route path='/estacionamiento' element={<AddNewParking />} />
      <Route
        path='/disponibilidad-estacionamiento'
        element={<ParkingAvailability />}
      />
      <Route path='/horario-estacionamiento' element={<ParkingSchedule />} />
      <Route path='/fotos-estacionamiento' element={<ParkingLotPhotos />} />

      {/* DATA DRIVER */}
      <Route path='/mis-datos' element={<MyDataDriver />} />
      <Route path='/editar-email' element={<DriverEmail />} />
      <Route path='/editar-celular' element={<DriverPhone />} />
      <Route path='/editar-password' element={<DriverPassword />} />

      {/* VEHICLE MENU */}
      <Route path='/mis-vehiculos' element={<MyVehicles />} />
      <Route path='/agregar-vehiculo' element={<FormDriver />} />

      {/* BOOKING DRIVER */}
      <Route path='/reservar/:idGaraje' element={<Booking />} />
      <Route
        path='/reservar-horario-vehiculo'
        element={<CarDateReservation />}
      />
      <Route
        path='/confirmacion-reserva'
        element={<ReservationConfirmation />}
      />

      {/* RESERVATION PAYMENT */}
      <Route path='/metodo-de-pago' element={<PaymentPage />} />

      {/* OTHERS */}
      <Route path='/cuenta-creada' element={<AccountCreated />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
