import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UserRegisterForm from "../components/UserRegisterForm";
interface Inputs {
	[key: string]: string | File;
	name: string;
	dni: string;
	email: string;
	phone: string;
	password: string;
	image: File;
	role: string;
}
export default function Register(): JSX.Element {
	const { state } = useLocation();
	const { UserType } = state;

	return (
		<main className="p-4">
			<h1>
				{UserType === "conductor"
					? "REGÍSTRATE COMO CONDUCTOR"
					: "REGÍSTRATE COMO ESTACIONAMIENTO"}
			</h1>
			<p>Completa tus datos personales</p>
			<UserRegisterForm />
		</main>
	);
}
