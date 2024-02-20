import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
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
export default function UserRegisterForm() {
	const { form } = useParams();
	console.log(form);
	const navigation = useNavigate();
	const [imgUser, setImgUser] = useState<string | ArrayBuffer>(
		"/images/addPhotoUser.svg",
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const formData = new FormData();
		for (const name in data) {
			formData.append(name, data[name]);
		}
		formData.append("role", "user");

		navigation(`/registro/${UserType}`);
	};
	const loadNewImage = (newImage: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(newImage);
		reader.onload = (e) => {
			setImgUser((prevState) => {
				return e.target?.result ?? prevState;
			});
		};
	};
	return (
		<form className="flex-col flex gap-3" onSubmit={handleSubmit(onSubmit)}>
			<label className="flex relative m-auto  ">
				<img
					src={imgUser as string}
					className="w-[200px] aspect-square object-contain "
					alt="user profile"
				/>
				<input
					onChange={(e) => {
						if (e.target.files?.item(0)) {
							const file = e.target.files[0];
							loadNewImage(file);
							setValue("image", file);
						}
					}}
					type="file"
					className="absolute border-4 opacity-0 w-[200px] h-[200px] z-10"
				/>
			</label>
			<label className="flex-col flex ">
				Nombre y apellido
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Ingresa tu nombre y apellido"
					type="text"
					{...register("name", { required: true })}
				/>
				{errors.name != null && (
					<span className="text-red-500">
						El nombre y apellido es obligatorio
					</span>
				)}
			</label>
			<label className="flex-col flex ">
				DNI
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Ingresa tu numero de DNI"
					type="number"
					{...register("dni", { required: true })}
				/>
				{errors.dni != null && (
					<span className="text-red-500">El DNI es obligatorio</span>
				)}
			</label>
			<label className="flex-col flex ">
				E-mail
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Ingresa tu de E-mail"
					type="email"
					{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email != null && (
					<span className="text-red-500">El E-mail es obligatorio</span>
				)}
			</label>
			<label className="flex-col flex ">
				Celular
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Ingresa numero de celular"
					type="number"
					{...register("phone", { required: true })}
				/>
				{errors.phone != null && (
					<span className="text-red-500">
						El numero de celular es obligatorio
					</span>
				)}
			</label>
			<label className="flex-col flex ">
				Contraseña
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Ingresa una contraseña"
					type="password"
					{...register("password", { required: true, min: 6 })}
				/>
				{errors.password != null && (
					<span className="text-red-500">La contraseña es obligatoria</span>
				)}
			</label>
			<label className="flex-col flex ">
				Repetir la contraseña
				<input
					className="border rounded-md py-2 px-3 placeholder:text-black"
					placeholder="Repetí la contraseña"
					type="password"
					{...register("password", { required: true })}
				/>
				{errors.password != null && (
					<span className="text-red-500">La contraseña es obligatoria</span>
				)}
			</label>
			<button
				className="border rounded-md p-2 font-bold bg-gray-200 text-center"
				type="submit"
			>
				Siguiente
			</button>
			<Link to={"/"} className="border rounded-md p-2 font-bold text-center">
				Cancelar
			</Link>
		</form>
	);
}
