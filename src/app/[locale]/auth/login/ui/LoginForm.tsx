"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

import clsx from "clsx";
import { IoInformationOutline } from "react-icons/io5";

import { authenticate } from "@/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const locale = useLocale();

  const [state, dispatch] = useFormState(authenticate, undefined);

  const router = useRouter();

  useEffect(() => {
    // Esto por que necesito un refresh de la pantalla para actualizar datos.
    if (state === "Success") {
      window.location.replace("/");
      // router.push("/");
    } /* redirect("/"); */
  }, [state, router]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />

            <p className="text-sm text-red-500 ">Credenciales invalidas</p>
          </>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href={`/${locale}/auth/new-account`}
        className="btn-secondary text-center"
      >
        Crear nueva cuenta
      </Link>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx({ "btn-primary": !pending, "btn-disabled": pending })}
      disabled={pending}
      type="submit"
    >
      Ingresar
    </button>
  );
}
