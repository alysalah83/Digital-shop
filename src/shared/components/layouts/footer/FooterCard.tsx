import Image from "next/image";
import cardBg from "@/../public/card-bg.jpeg";
import Button from "@/shared/components/common/Button";

function FooterCard() {
  return (
    <div className="relative mb-12 rounded-lg">
      <div className="flex flex-col gap-8 px-8 py-10 text-slate-50 lg:flex-row xl:px-12 xl:py-16">
        <div>
          <h3 className="mb-3 text-2xl font-bold capitalize xl:text-4xl">
            Don&apos;t Miss Out Latest Trends & Offers
          </h3>
          <p className="text-lg">
            Register to receive news about the latest offers & discount codes
          </p>
        </div>
        <div className="flex flex-col gap-5 sm:w-fit sm:flex-row lg:items-center">
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full rounded-md bg-white px-5 py-3 text-gray-600 outline-0 focus:ring-2 focus:ring-blue-950 focus:ring-offset-1 sm:min-w-xs"
          />
          <Button
            scratch={true}
            bgColor="bg-[#3c50e0] hover:bg-blue-900"
            size="large"
          >
            subscribe
          </Button>
        </div>
      </div>
      <Image
        src={cardBg}
        fill
        className="-z-1 rounded-lg object-fill"
        alt="card background"
      />
    </div>
  );
}

export default FooterCard;
