import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-bl from-white to-secondary text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Image src="/logo.svg" alt=" Inkingi System Logo" width={500} height={500} priority />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-secondary p-4 hover:gap-2 transition-all"
            href="/register"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Register School in Inkingi System
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-secondary p-4 hover:gap-2 transition-all"
            href="/login"
          >
            <h3 className="text-2xl font-bold">Login →</h3>
            <div className="text-lg">
              Login in Inkingi System
            </div>
          </Link>
        </div>
        <Footer />
      </div>
    </main>
  );
}
