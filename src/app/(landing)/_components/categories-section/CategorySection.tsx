import LandingSectionHeader from "@/app/(landing)/_components/shared/LandingSectionHeader";
import {
  ScrollSlider,
  ScrollSliderButtons,
  ScrollSliderContent,
} from "@/shared/components/ui/ScrollSlider";
import CategoryItem from "./CategoryItem";
import { cacheLife } from "next/cache";
import { getCategories } from "@/features/category/queries/categories.queries";

async function CategoriesSection() {
  "use cache";
  cacheLife("max");

  const categories = await getCategories();

  return (
    <section data-threshold="true">
      <div className="mx-auto mt-16 max-w-7xl p-6 pt-0">
        <ScrollSlider>
          <LandingSectionHeader
            icon="category"
            label="Browser by Categories"
            title="Categories"
            button={<ScrollSliderButtons />}
          />
          <ScrollSliderContent>
            {categories.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
          </ScrollSliderContent>
        </ScrollSlider>
      </div>
    </section>
  );
}

export default CategoriesSection;
