"use client";

import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  InputCheckElement,
  InputSelectElement,
  InputTextElement,
} from "@/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { checkoutStore } from "@/store";
import { useEffect } from "react";
import { deleteUserAddress, saveUserAddress } from "@/actions";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useValidateCart } from "@/hooks";

type TForm = {
  name: string;
  lastName: string;
  direction: string;
  direction2?: string | null;
  cp: string;
  city: string;
  country: string;
  phone: string;
  rememberDir?: boolean | undefined | null;
};

export function AddressFrom({
  countries,
  session,
  address,
}: {
  countries:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  session: Session | null;
  address: any;
}) {
  const t = useTranslations("Checkout.address");

  useValidateCart();

  const { setCheckout, checkout } = checkoutStore();

  const router = useRouter();

  const locale = useLocale();

  const schema = z.object({
    name: z.string().min(3),
    lastName: z.string().min(3),
    direction: z.string().min(5),
    direction2: z.string().min(5).optional(),
    cp: z.string().min(2),
    city: z.string().min(4),
    country: z.string().min(2),
    phone: z.string().min(6),
    rememberDir: z.boolean().optional(),
  });

  const defaultValuesLocalOrBD =
    Object.keys(address).length !== 0 ? address : checkout;

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<TForm>({
    defaultValues: defaultValuesLocalOrBD,
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (defaultValuesLocalOrBD) {
      reset(defaultValuesLocalOrBD);
    }
  }, [defaultValuesLocalOrBD, reset]);

  async function onSubmit(data: TForm) {
    setCheckout(data);

    const { rememberDir, ...rest } = data;

    if (data.rememberDir) {
      await saveUserAddress(rest, session?.user?.id ?? "");
    } else {
      await deleteUserAddress(session?.user?.id ?? "");
    }

    router.replace(`/${locale}/checkout`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <InputTextElement control={control} label={t("name")} name="name" />

      <InputTextElement
        control={control}
        label={t("lastName")}
        name="lastName"
      />

      <InputTextElement
        control={control}
        label={t("direction")}
        name="direction"
      />

      <InputTextElement
        control={control}
        label={t("direction2")}
        name="direction2"
      />

      {/* TODO input number */}
      <InputTextElement control={control} label={t("cp")} name="cp" />

      <InputTextElement control={control} label={t("city")} name="city" />

      <InputSelectElement
        control={control}
        label={t("country")}
        name={"country"}
        options={countries}
      />

      {/* TODO input number */}
      <InputTextElement control={control} label={t("phone")} name="phone" />

      <div className="flex flex-col mb-2 gap-4">
        <InputCheckElement
          control={control}
          name={"rememberDir"}
          label={t("remember-dir")}
        />

        <button
          disabled={!isValid}
          type="submit"
          className={clsx("flex w-full sm:w-1/2 justify-center", {
            "btn-disabled": !isValid,
            "btn-primary": isValid,
          })}
        >
          {t("next")}
        </button>
        {/* <button type="submit"> Siguiente</button> */}
      </div>
    </form>
  );
}
