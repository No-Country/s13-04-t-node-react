import { useParams } from "react-router-dom";
import UserRegisterForm from "../components/UserRegisterForm";
import { Header } from "../components/Header";

export default function Register(): JSX.Element {
	const { type } = useParams();

	return (
		<>
			<Header />
			<main className="p-4 pb-10">
				<h1 className="text-2xl">
					{type === "conductor"
						? "REGÍSTRATE COMO CONDUCTOR"
						: "REGÍSTRATE COMO ESTACIONAMIENTO"}
				</h1>
				<p className="text-base mb-10">Completa tus datos personales</p>
				<UserRegisterForm />
			</main>
		</>
	);
}
