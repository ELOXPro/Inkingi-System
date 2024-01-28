import Image from "next/image";
import { Footer } from "@/components/Footer";
import LoginForm from "@/components/auth/signin";

export const metadata = {
  title: "Log in || Inkingi System",
  description: "Log in Inkingi System.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function Login() {

  return (
    <div className="min-h-screen h-screen">
      <div className="flex flex-col md:flex-row gap-4 h-[95%]  items-center justify-center p-2">
        <div className="w-full md:w-1/2 flex flex-col gap-8 h-auto p-0 md:pl-24 justify-center">
          <Image src="/logo.svg" alt=" Inkingi System Logo" width={500} height={500} priority />
          <h1 className="hidden md:flex text-xl font-medium text-secondary">Streamline school information effortlessly with our powerful, user-friendly system.</h1>
        </div>
        <div className="container px-0 pb-2 w-full sm:w-1/3 shadow-lg shadow-primary flex flex-col items-center justify-center gap-4 border border-primary rounded-2xl overflow-hidden">
          <div className="flex w-full bg-primary justify-center p-2">
            <h1 className="text-xl font-bold text-primary-foreground">Login</h1>
          </div>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
