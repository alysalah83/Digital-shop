import { ICONS_MAP } from "@/shared/icons/iconsMap";

type ActionResponse<T = void> =
  | { status: "success"; message: string; payload?: T }
  | { status: "error"; error: { message: string } };

type IconsMap = keyof typeof ICONS_MAP;

export type { IconsMap, ActionResponse };
