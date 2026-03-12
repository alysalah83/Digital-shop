"use client";

import { Category } from "@/features/category/types/category.types";
import { useScrollSlider } from "@/shared/components/ui/ScrollSlider";
import Image from "next/image";
import Link from "next/link";

function CategoryItem({ category }: { category: Category }) {
  const { sliderOffset, elementPerSlide } = useScrollSlider();
  const { image, name } = category;

  return (
    <Link href={`/shop?category=${name}`}>
      <div
        className="group flex flex-col justify-between gap-4 hover:cursor-pointer"
        style={{ minWidth: `${sliderOffset / elementPerSlide}px` }}
      >
        <div className="relative flex h-3/4 justify-center">
          <Image
            src={image}
            width={90}
            height={90}
            alt={`${name} category image`}
            style={{ objectFit: "contain" }}
            className="z-1"
          />
          <div className="absolute top-1/2 left-1/2 z-0 h-full w-[90px] -translate-1/2 rounded-full bg-blue-200 opacity-25" />
        </div>
        <div className="flex justify-center">
          <div className="flex h-fit w-fit flex-col items-center">
            <h4 className="mb-1 text-xl font-semibold text-slate-800 capitalize group-hover:text-blue-800">
              {name.replace("-", " & ")}
            </h4>
            <span className="h-0.5 w-0 transform self-start bg-slate-800 duration-300 group-hover:w-full group-hover:bg-blue-800" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
