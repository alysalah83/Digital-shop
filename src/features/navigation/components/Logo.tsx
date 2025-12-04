import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image src={logo} width={40} alt="Logo" />
        <span className="text-3xl font-bold tracking-wide">ShopDigital</span>
      </div>
    </Link>
  );
}

export default Logo;
