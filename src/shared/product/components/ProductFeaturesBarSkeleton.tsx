import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { PRODUCT_FEATURES_BAR_BUTTONS_COUNT } from "../consts/product.consts";

function ProductFeaturesBarSkeleton() {
  return (
    <menu className="absolute top-2 right-2 z-10 flex flex-col gap-3">
      {Array.from({ length: PRODUCT_FEATURES_BAR_BUTTONS_COUNT }).map(
        (_, index) => (
          <li key={index}>
            <SkeletonLoader
              rounded="rounded-full"
              width="w-9.5"
              hight="h-9.5"
            />
          </li>
        ),
      )}
    </menu>
  );
}

export default ProductFeaturesBarSkeleton;
