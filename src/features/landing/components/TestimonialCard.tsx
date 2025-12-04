import Image from "next/image";
import user1 from "@/../public/user-01.jpeg";
import RatingStars from "@/components/ui/RatingStars";

function TestimonialCard() {
  return (
    <div className="flex w-full shrink-0 justify-center">
      <div className="w-fit rounded-lg bg-slate-100 p-10 shadow-lg select-none sm:max-w-11/12 lg:max-w-3/4">
        <RatingStars currentRating={5} showRatingNumberLabel={false} />
        <p className="mb-6">
          Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo
          vitaeaugue suscipit beautiful vehicula
        </p>
        <div className="flex items-center gap-4">
          <Image
            width={50}
            height={50}
            src={user1}
            alt="user image"
            className="rounded-full"
          />
          <div>
            <h4 className="mb-1.5 text-lg font-bold capitalize">Aly salah</h4>
            <span>Senior Frontend Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
