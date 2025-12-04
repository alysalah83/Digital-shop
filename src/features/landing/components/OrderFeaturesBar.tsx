import { ORDER_FEATURES } from "../consts/main.consts";
import { ICONS_MAP } from "@/consts/iconsMap";
import { useMemo } from "react";
import { OrderFeature } from "../types/main.types";

function OrderFeaturesBar() {
  return (
    <div className="mb-10 flex flex-wrap justify-between gap-6 sm:col-span-2 md:gap-8 lg:justify-around lg:gap-0">
      {ORDER_FEATURES.map((feature) => (
        <Feature feature={feature} key={feature.title} />
      ))}
    </div>
  );
}

function Feature({ feature }: { feature: OrderFeature }) {
  const { icon, title, label } = feature;
  const Icon = useMemo(() => ICONS_MAP[icon], [icon]);
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-10 w-10 self-center fill-slate-950" />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-950 capitalize">
          {title}
        </h3>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
    </div>
  );
}

export default OrderFeaturesBar;
