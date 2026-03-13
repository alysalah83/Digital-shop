import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { IconsMap } from "@/shared/types";

interface LandingSectionHeaderProps {
  title: string;
  label: string;
  icon: IconsMap;
  button?: React.ReactNode;
}

function LandingSectionHeader({
  title,
  label,
  icon,
  button,
}: LandingSectionHeaderProps) {
  const Icon = ICONS_MAP[icon];

  return (
    <header className="mb-9 flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <span className="flex items-center gap-2">
          <Icon className="size-6 text-blue-700" />
          <span className="str text-lg font-semibold capitalize">{title}</span>
        </span>
        <h2 className="text-2xl font-bold text-blue-950 capitalize">{label}</h2>
      </div>
      {button && <div className="flex gap-4">{button}</div>}
    </header>
  );
}

export default LandingSectionHeader;
