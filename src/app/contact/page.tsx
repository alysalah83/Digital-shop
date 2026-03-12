import Button from "@/shared/components/common/Button";
import FormInput from "@/shared/components/common/FormInput";
import PageHeader from "@/shared/components/layouts/PageHeader";
import { ICONS_MAP } from "@/shared/icons/iconsMap";

export const metadata = {
  title: "Contact",
};

function page() {
  return (
    <>
      <PageHeader heading="Contact" />
      <div className="bg-gray-100 px-8 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
          <aside className="flex flex-col gap-5 rounded-xl bg-white">
            <h3 className="border-b border-gray-200 px-10 py-6 text-xl font-semibold">
              Contact information
            </h3>
            <address className="px-10 pb-6">
              <ul className="flex flex-col gap-5 text-lg text-gray-600">
                <li>
                  <a
                    href="mailto:alysalah83@gmail.com"
                    className="flex items-center gap-3 transition-colors duration-300 hover:text-blue-600"
                  >
                    <span>
                      <ICONS_MAP.mail className="h-7 w-7 text-blue-500" />
                    </span>
                    <span>alysalah83@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+201274200601"
                    className="flex items-center gap-3 transition-colors duration-300 hover:text-blue-600"
                  >
                    <span>
                      <ICONS_MAP.call className="h-7 w-7 text-blue-500" />
                    </span>
                    <span>01274200601</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <ICONS_MAP.locationPin className="h-7 w-7 text-blue-500" />
                  </span>
                  <span>Egypt, Alexandria, elbetash ,2 elsalem Street</span>
                </li>
              </ul>
            </address>
          </aside>
          <form className="flex-grow rounded-xl bg-white p-10">
            <div className="mb-8 flex gap-6 lg:mb-10 lg:gap-12">
              <FormInput label="First Name" placeholder="Aly" type="text" />
              <FormInput label="Last Name" placeholder="Salah" type="text" />
            </div>
            <div className="mb-8 flex gap-6 lg:mb-10 lg:gap-12">
              <FormInput
                label="Subject"
                placeholder="Type of Subject"
                type="text"
              />
              <FormInput
                label="Phone"
                placeholder="Enter your phone"
                type="number"
              />
            </div>
            <div className="mb-8 flex flex-col gap-3 lg:mb-10">
              <label htmlFor="comment" className="w-fit font-medium">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Enter Your Comment"
                required
                className="h-36 w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              />
            </div>
            <Button>Submit Review</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
