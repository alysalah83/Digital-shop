import Link from "next/link";
import { ICONS_MAP } from "@/consts/iconsMap";

function FooterLists() {
  return (
    <>
      <div className="flex flex-wrap gap-x-20 gap-y-16 lg:justify-between lg:gap-x-0">
        <div className="w-fit">
          <h3 className="mb-8 text-xl font-bold">Contact</h3>
          <address>
            <ul className="flex flex-col gap-5 text-lg text-gray-600">
              <li className="flex items-center gap-3">
                <span>
                  <ICONS_MAP.locationPin className="h-7 w-7 text-blue-500" />
                </span>
                <span>Egypt, Alexandria</span>
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
            </ul>
          </address>
        </div>
        <div>
          <h3 className="mb-8 text-xl font-bold">Quick Link</h3>
          <ul className="flex flex-col gap-5 text-lg text-gray-600">
            <li className="transition-colors duration-300 hover:text-blue-600">
              <Link href="/signIn">Login / Register</Link>
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              <Link href="/cart">Cart</Link>
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              <Link href="/whiteList">Whitelist</Link>
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-8 text-xl font-bold">Terms of use</h3>
          <ul className="flex flex-col gap-5 text-lg text-gray-600">
            <li className="transition-colors duration-300 hover:text-blue-600">
              Privacy Polices
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              Refund Polices
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              Term of Use
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              FAQ
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-8 self-center text-xl font-bold">Social Media</h3>
          <ul className="flex flex-col gap-5 text-lg text-gray-600">
            <li className="transition-colors duration-300 hover:text-blue-600">
              <a
                href="https://www.facebook.com/aly.salah.9083"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-blue-600"
              >
                <span>
                  <ICONS_MAP.facebook className="h-7 w-7 hover:fill-blue-600" />
                </span>
                <span>facebook Account</span>
              </a>
            </li>
            <li className="transition duration-300 hover:text-blue-600">
              <a
                href="https://x.com/Alisalah838"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-blue-600"
              >
                <span>
                  <ICONS_MAP.twitter className="h-7 w-7 hover:fill-blue-600" />
                </span>
                <span>twitter Account</span>
              </a>
            </li>
            <li className="transition-colors duration-300 hover:text-blue-600">
              <a
                href="https://www.linkedin.com/in/aly-salah-456942286/"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-blue-600"
              >
                <span>
                  <ICONS_MAP.linkedin className="h-7 w-7 hover:fill-blue-600" />
                </span>
                <span>linkedIn Account</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default FooterLists;
