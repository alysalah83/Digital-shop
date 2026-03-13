import {
  Slider,
  SliderCards,
  SliderNavBtns,
} from "@/shared/components/ui/Slider";
import LandingSectionHeader from "@/app/(landing)/_components/shared/LandingSectionHeader";
import TestimonialCard from "./TestimonialCard";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { TESTiMONIALS_COUNT } from "./testimonial.consts";

function TestimonialsSection() {
  return (
    <section>
      <div className="mx-auto mt-16 max-w-7xl overflow-hidden p-6 pt-0">
        <Slider count={TESTiMONIALS_COUNT}>
          <LandingSectionHeader
            title="Testimonials"
            label="User Feedbacks"
            icon="users"
            button={
              <SliderNavBtns>
                <>
                  <button
                    aria-label="slider arrow left button"
                    className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
                  >
                    <ICONS_MAP.arrowLeft className="h-5 w-5 fill-slate-900" />
                  </button>
                  <button
                    aria-label="slider arrow right button"
                    className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
                  >
                    <ICONS_MAP.arrowRight className="h-5 w-5 fill-slate-900" />
                  </button>
                </>
              </SliderNavBtns>
            }
          />
          <SliderCards>
            {Array.from({ length: TESTiMONIALS_COUNT }).map((_, index) => (
              <TestimonialCard key={index + 1} />
            ))}
          </SliderCards>
        </Slider>
      </div>
    </section>
  );
}

export default TestimonialsSection;
