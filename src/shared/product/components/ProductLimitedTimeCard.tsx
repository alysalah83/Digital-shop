import Image from "next/image";
import headPhone from "@/../public/head-phone.png";
import Button from "@/components/common/Button";
import CutdownTimer from "@/components/common/CutdownTimer";

function ProductLimitedTimeCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-sky-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row lg:gap-10">
        <div className="flex-1">
          <span className="mb-3 inline-block rounded-full bg-blue-200 px-4 py-1 text-sm font-semibold text-blue-700 uppercase">
            Limited Time Offer!
          </span>

          <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-blue-950 sm:text-3xl lg:text-4xl">
            Enhance Your Gaming Experience
          </h2>

          <p className="mb-6 text-lg text-gray-600">
            True Wireless Noise Cancelling Headphone
          </p>
          <div className="mb-8 flex gap-3 sm:gap-5 lg:gap-7">
            <CutdownTimer />
          </div>
          <Button size="large">Check It Out!</Button>
        </div>
        <div className="flex items-center justify-center md:justify-end lg:min-w-72">
          <div className="relative h-64 w-full sm:h-72 md:h-80 lg:h-96">
            <Image
              src={headPhone}
              alt="headphone image"
              className="object-contain drop-shadow-xl"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
      <span className="absolute -top-[90px] -left-[90px] h-64 w-64 rounded-full bg-sky-500 opacity-10" />
      <span className="absolute -right-[90px] -bottom-[90px] h-64 w-64 rounded-full bg-sky-500 opacity-10" />
    </div>
  );
}

export default ProductLimitedTimeCard;
