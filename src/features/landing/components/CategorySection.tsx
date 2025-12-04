import LandingSectionHeader from "@/components/layouts/LandingSectionHeader";
import {
  ScrollSlider,
  ScrollSliderButtons,
  ScrollSliderContent,
} from "@/components/ui/ScrollSlider";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryItem from "./CategoryItem";

async function CategoriesSection() {
  "use cache";

  const categories = await prisma.category.findMany();

  if (!categories) return notFound();

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
