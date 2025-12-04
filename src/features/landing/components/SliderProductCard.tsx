import { Slider, SliderCards, SliderNavBtns } from "@/components/ui/Slider";
import ProductDiscountCard from "@/shared/product/components/ProductDiscountCard";
import { ProductWithDiscount } from "@/shared/product/types/product.type";

function ProductSlider({ products }: { products: ProductWithDiscount[] }) {
  return (
    <section className="relative overflow-x-hidden rounded-xl bg-white shadow-lg select-none sm:col-span-2">
      <Slider count={products.length}>
        <SliderCards>
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 px-6 py-8 pb-15 sm:py-12 md:px-10"
            >
              <ProductDiscountCard product={product} />
            </div>
          ))}
        </SliderCards>
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-4">
          <SliderNavBtns>
            <button
              className={`h-1 cursor-pointer rounded-sm transition duration-300`}
              title="slider button"
            />
          </SliderNavBtns>
        </div>
      </Slider>
    </section>
  );
}

export default ProductSlider;
