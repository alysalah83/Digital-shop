import PageHeader from "@/shared/components/layouts/PageHeader";
import Logo from "@/shared/components/layouts/navigation/components/Logo";
import googleLogo from "@/../public/Logo-google-icon-PNG.png";
import Image from "next/image";
import { signIn } from "@/lib/auth";

export const metadata = {
  title: "login",
};

function LoginPage() {
  return (
    <>
      <PageHeader heading="Sign in" />
      <main className="bg-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-center py-24">
          <div className="flex flex-col items-center gap-12 rounded-lg bg-white px-12 py-12 shadow-md">
            <Logo />
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-5 rounded-full bg-gray-200 px-6 py-3 shadow-md"
              >
                <Image
                  src={googleLogo}
                  width={35}
                  height={35}
                  alt="google logo "
                />
                <span className="text-lg font-semibold text-gray-800">
                  Sign in with Google
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
