import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { HERO_ORDER_FEATURE_ITEMS } from "./hero.consts";

function OrderFeaturesBar() {
  return (
    <div className="mb-10 flex flex-wrap justify-between gap-6 sm:col-span-2 md:gap-8 lg:justify-around lg:gap-0">
      {HERO_ORDER_FEATURE_ITEMS.map((feature) => {
        const { icon, title, label } = feature;
        const Icon = ICONS_MAP[icon];
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
      })}
    </div>
  );
}

export default OrderFeaturesBar;
