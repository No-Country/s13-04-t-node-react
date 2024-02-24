import { Route, Routes } from 'react-router-dom';
// HOME DRIVER
import { Home } from '../pages/home/Home';
import { SearchPage } from '../pages/home-driver/SearchPage';
// REGISTER DRIVER
import { AddNewVehicule } from '../pages/register-driver/AddNewVehicule';
// REGISTER PARKING
import { AddNewParking } from '../pages/register-parking/AddNewParking';
import { ParkingAvailability } from '../pages/register-parking/ParkingAvailability';
import { ParkingSchedule } from '../pages/register-parking/ParkingSchedule';
import { ParkingLotPhotos } from '../pages/register-parking/ParkingLotPhotos';
// MENU DATA DRIVER
import { MyDataDriver } from '../pages/menu-data-driver/MyDataDriver';
import { DriverEmail } from '../pages/menu-data-driver/DriverEmail';
import { DriverPhone } from '../pages/menu-data-driver/DriverPhone';
import { DriverPassword } from '../pages/menu-data-driver/DriverPassword';
// MENU VEHICLE MENU
import { MyVehicles } from '../pages/menu-my-vehicles/MyVehicles';
import { FormDriver } from '../pages/menu-my-vehicles/FormDriver';
// MENU RESERVAS DRIVER
import { ReservationMenuList } from '../pages/menu-bookings/ReservationMenuList';
import { PendingReservations } from '../pages/menu-bookings/PendingReservations';
import { ActiveReservations } from '../pages/menu-bookings/ActiveReservations';
import { PastReservations } from '../pages/menu-bookings/PastReservations';
// BOOKING DRIVER
import Booking from '../pages/booking-driver/Booking';
import { CarDateReservation } from '../pages/booking-driver/CarDateReservation';
import { ReservationConfirmation } from '../pages/booking-driver/ReservationConfirmation';
// RESERVATION PAYMENT
import { PaymentPage } from '../pages/reservation-payment/PaymentPage';
import { CashPaymentPage } from '../pages/reservation-payment/CashPaymentPage';
import { RejectedReservationPage } from '../pages/reservation-payment/RejectedReservationPage';
// MENU FAVORITE GARAGES DRIVER
import { FavoriteGaragesPage } from '../pages/menu-favorite-garages/FavoriteGaragesPage';
// OTHERS
import { AccountCreated } from '../pages/register/AccountCreated';
import { NotFound } from '../pages/not-found/NotFound';

export default function AuthRouter() {
  return (
    <Routes>
      {/* HOME DRIVER */}
      <Route path='/' element={<Home />} />
      <Route path='/resultados-garajes' element={<SearchPage />} />

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

      {/* MENU DATA DRIVER */}
      <Route path='/mis-datos' element={<MyDataDriver />} />
      <Route path='/editar-email' element={<DriverEmail />} />
      <Route path='/editar-celular' element={<DriverPhone />} />
      <Route path='/editar-password' element={<DriverPassword />} />

      {/* MENU MY VEHICLES DRIVER */}
      <Route path='/mis-vehiculos' element={<MyVehicles />} />
      <Route path='/agregar-vehiculo' element={<FormDriver />} />

      {/* MENU RESERVAS DRIVER */}
      <Route path='/lista-menu-reservas' element={<ReservationMenuList />} />
      <Route path='/reservas-pendientes' element={<PendingReservations />} />
      <Route path='/reservas-activas' element={<ActiveReservations />} />
      <Route path='/reservas-pasadas' element={<PastReservations />} />

      {/* MENU FAVORITE GARAGES DRIVER */}
      <Route path='/garajes-favoritos' element={<FavoriteGaragesPage />} />

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
      <Route path='/efectivo-pago' element={<CashPaymentPage />} />
      <Route path='/reserva-rechazada' element={<RejectedReservationPage />} />

      {/* OTHERS */}
      <Route path='/cuenta-creada' element={<AccountCreated />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
