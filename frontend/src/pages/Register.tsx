import { useLocation } from "react-router-dom"
import UserRegisterForm from "../components/UserRegisterForm"

export default function Register(): JSX.Element {
  const { state } = useLocation()
  const { form } = state

  return (
    <main className="p-4">
      {form === 'conductor' ?
        (
          <>
            <h1>REGÍSTRATE COMO CONDUCTOR</h1>
            <p>Completa tus datos personales</p>
          </>
        ) :
        (
          <>
            <h1>REGÍSTRATE COMO ESTACIONAMIENTO</h1>
            <p>Completa tus datos personales</p>
          </>
        )
      }
      <UserRegisterForm />
    </main>
  )
}
