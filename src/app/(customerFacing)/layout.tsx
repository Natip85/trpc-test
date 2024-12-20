import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";
import NavbarMobile from "@/components/navigation/navbar-mobile";
import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Jew Hate Database",
  description: "A database of Jew haters",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HydrateClient>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <NavbarMobile />
        <main className="flex flex-1">{children}</main>
        <Footer />
      </div>
    </HydrateClient>
  );
}
