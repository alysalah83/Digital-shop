import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  placeholder: string;
  isPending?: boolean;
  type: HTMLInputElement["type"];
  register?: UseFormRegisterReturn;
  error?: string;
}

function FormInput({
  label,
  register,
  isPending = false,
  type,
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={label} className="w-fit font-medium">
          {label}
        </label>
        <input
          id={label}
          {...register}
          type={type}
          placeholder={placeholder}
          required
          disabled={isPending}
          className={`w-full rounded-md border ${error ? "border-red-500 ring-red-600" : "border-gray-300 ring-blue-600"} bg-gray-200 px-4 py-2 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-300`}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-red-600 capitalize">{error}</p>
      )}
    </div>
  );
}

export default memo(FormInput);
