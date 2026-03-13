import { UseFormRegisterReturn } from "react-hook-form";

interface FormInput {
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  label: string;
  inputType: HTMLInputElement["type"];
  disabled?: boolean;
  disabledCursor?: `disabled:cursor-${string}`;
}

function FormInput({
  register,
  errorMessage,
  label,
  inputType,
  disabled = false,
  disabledCursor = "disabled:cursor-not-allowed",
}: FormInput) {
  return (
    <div className="space-y-1">
      <div className="relative mt-6">
        <input
          id="input"
          disabled={disabled}
          {...register}
          type={inputType}
          required
          placeholder=""
          className={`peer w-full rounded-lg border-[1.5px] ${errorMessage ? "border-red-700" : "border-gray-300 focus:border-blue-600"} px-5 py-2 text-gray-600 outline-0 transition duration-300 ${disabledCursor} disabled:bg-gray-200`}
        />
        <label
          htmlFor="input"
          className="pointer-events-none absolute left-5 font-medium text-gray-500 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:bg-white peer-focus:px-1 peer-focus:tracking-wide peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:tracking-wide"
        >
          {label}
        </label>
      </div>
      {errorMessage && (
        <p className="text-sm font-medium text-red-700">{errorMessage}</p>
      )}
    </div>
  );
}

export default FormInput;
