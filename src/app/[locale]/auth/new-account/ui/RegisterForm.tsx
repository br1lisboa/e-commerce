"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { login, registerUser } from "@/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const locale = useLocale();

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();

  const schema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  async function onSubmit(data: FormInputs) {
    const { name, email, password } = data;

    setErrorMessage("");

    const { ok, message } = await registerUser(name, email, password);

    if (!ok) {
      setErrorMessage(message);
    }

    const { ok: userCreate } = await login(email.toLowerCase(), password);

    if (userCreate) {
      router.replace("/");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input
        control={control}
        name="name"
        label="Nombre completo"
        type="text"
      />

      <Input
        control={control}
        name="email"
        label="Correo electrónico"
        type="email"
      />

      <Input
        control={control}
        name="password"
        label="Contraseña"
        type="password"
      />

      {errorMessage && (
        <span className="pb-4 text-red-400 w-full text-center">
          * {errorMessage}
        </span>
      )}

      <button className="btn-primary">Crear nueva cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href={`/${locale}/auth/login`}
        className="btn-secondary text-center"
      >
        Ingresar
      </Link>
    </form>
  );
}
