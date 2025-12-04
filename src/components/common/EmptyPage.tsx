import { IconsMap } from "@/types";
import { ICONS_MAP } from "@/consts/iconsMap";
import Link from "next/link";
import Button from "./Button";

interface EmptyPageProps {
  label: string;
  icon: IconsMap;
  goToBtnHref?: string;
  goToBtnLabel?: string;
}

function EmptyPage({
  label,
  icon,
  goToBtnLabel = "Continue shopping",
  goToBtnHref = "/shop",
}: EmptyPageProps) {
  const Icon = ICONS_MAP[icon];

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="rounded-full bg-gray-100 p-8">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium tracking-wide text-gray-400 capitalize">
        {label}
      </h3>
      <Link href={goToBtnHref}>
        <Button scratch={true} size="large">
          {goToBtnLabel}
        </Button>
      </Link>
    </div>
  );
}

export default EmptyPage;
