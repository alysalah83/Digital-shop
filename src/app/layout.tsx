import ToasterConfig from "@/shared/components/layouts/ToasterConfig";
import Footer from "@/shared/components/layouts/footer/Footer";
import Navigation from "@/shared/components/layouts/navigation/components/Navigation";
import QueryProvider from "@/shared/providers/QueryProvider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ShopDigital",
    default: "ShopDigital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} overflow-x-hidden overflow-y-auto`}
    >
      <body className="relative flex min-h-screen w-full flex-col overflow-x-hidden text-base text-slate-700">
        <ToasterConfig />
        <QueryProvider>
          <Navigation />
          {children}
        </QueryProvider>

        <Footer />
      </body>
    </html>
  );
}
