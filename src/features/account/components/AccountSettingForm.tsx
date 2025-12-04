"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateUser } from "../actions/account.actions";
import { UserData } from "../types/account.type";
import { getAddressInformation, getGeoLocation } from "@/lib/api";
import { ICONS_MAP } from "@/consts/iconsMap";

interface Inputs {
  name: string;
  email: string;
  address: string;
}

function AccountSettingForm({ userData }: { userData: UserData }) {
  const { name, email, address } = userData;
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
      address: address ?? "",
    },
  });
  const [isPending, setIsPending] = useState(false);
  const [isAddressPending, setIsAddressPending] = useState(false);

  useEffect(() => {
    setValue("email", email ?? "");
  }, [email, setValue]);

  const handleGetAddress = async function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (e) {
      e.preventDefault();
      setValue("address", "");
    }
    setIsAddressPending(true);
    const toastId = toast.loading("Loading Address");
    try {
      const { latitude, longitude } = await getGeoLocation();
      const {
        features: [{ properties }],
      } = await getAddressInformation({ latitude, longitude });
      setValue(
        "address",
        `${properties.country}, ${properties.city}, ${properties.address_line1}`,
      );
    } catch (error) {
      toast.error("failed to extract the position");
    } finally {
      setIsAddressPending(false);
      toast.dismiss(toastId);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, address } = data;
    setIsPending(true);
    const state = await updateUser({ name, address });
    setIsPending(false);
    if (state.error) toast.error(state.message);
    if (state.success) toast.success(state.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register("name")}
        label="Full Name"
        inputType="text"
        disabled={isPending}
      />
      <FormInput
        register={register("email")}
        label="Email"
        inputType="email"
        disabled={true}
      />
      <div className="relative mb-2">
        <FormInput
          register={register("address")}
          label="Address"
          inputType="text"
          disabledCursor="disabled:cursor-progress"
          disabled={isPending || isAddressPending}
        />
        <button
          className="absolute top-2 right-0.5 cursor-pointer rounded-md disabled:cursor-progress"
          aria-label="get address button"
          disabled={isPending || isAddressPending}
          onClick={handleGetAddress}
        >
          <ICONS_MAP.locationPin className="h-6 w-6 text-blue-600" />
        </button>
      </div>
      <p className="mb-12 text-sm font-medium text-gray-400">
        Click the location button to get your address
      </p>
      <div className="mb-2">
        <Button disabled={isPending || isAddressPending}>Update Setting</Button>
      </div>
    </form>
  );
}

export default AccountSettingForm;
