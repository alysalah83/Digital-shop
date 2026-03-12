import { ICONS_MAP } from "@/shared/icons/iconsMap";

interface FormStateMessageProps {
  state: {
    success: boolean;
    message: string;
  };
}

function FormStateMessage({ state }: FormStateMessageProps) {
  if (!state) return null;

  return state?.success ? (
    <p className="flex items-center gap-1 text-sm font-medium text-emerald-600 capitalize">
      <ICONS_MAP.checkMark className="h-4 w-4" />
      <span>{state.message}</span>
    </p>
  ) : (
    <p className="flex items-center gap-1 text-sm font-medium text-red-600 capitalize">
      <ICONS_MAP.error className="h-4 w-4" />
      <span>{state.message}</span>
    </p>
  );
}

export default FormStateMessage;
