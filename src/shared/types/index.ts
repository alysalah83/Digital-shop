import { ICONS_MAP } from "@/shared/icons/iconsMap";

type ActionResponse =
  | { status: "success"; message: string }
  | { status: "error"; error: { message: string } };

type IconsMap = keyof typeof ICONS_MAP;

export type { IconsMap, ActionResponse };
