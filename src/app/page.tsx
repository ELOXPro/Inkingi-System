import Link from "next/link";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserSession } from "@/components/Interfaces";

export default async function Home() {
  const session = await getServerSession(authOptions) as unknown as UserSession;
  const sessionData = session  
  const user = sessionData?.user?.name
  const roles = sessionData?.user?.roles
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
        <div className="border border-primary rounded-md text-primary p-2 bg-white shadow-primary shadow-lg">
          {user ? (
            <>
              <h1 className="font-bold text-xl capitalize">Logged in as {user}</h1>
              {roles ? (
                roles.map((role) => (
                  <h1 key={role.role} className="font-medium text-lg capitalize">
                    role : {role.role}
                  </h1>
                ))
              ) : (
                <h1 className="font-medium text-lg capitalize">No Roles</h1>
              )}
            </>
          ) : (
            <h1 className="font-bold text-xl capitalize text-secondary">Please Login</h1>
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
}
