import Image from "next/image";
import { Footer } from "@/components/Footer";
import SignUpForm from "@/components/auth/signup";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up || Inkingi System",
  description: "Add a User in Inkingi System.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RegisterUser({ params }: { params: { schoolId: string, role: string } }) {

  const schoolId = params.schoolId
  const role = params.role
  const availableRoles = ["admin", "teacher", "student","dod","dos","prefect"]
  const isRoleValid = availableRoles.includes(role);

  if (!isRoleValid) { redirect("/"); }

  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-2">
      <div className="w-1/2 md:w-1/3 flex">
        <Image src="/logo.svg" alt=" Inkingi System Logo" width={500} height={500} priority />
      </div>
      <div className="container p-0 w-auto shadow-lg shadow-primary flex flex-col items-center justify-center gap-0 border border-primary rounded-2xl overflow-hidden">
        <div className="flex w-full bg-primary justify-center p-2">
          <h1 className="text-xl font-bold text-primary-foreground capitalize">create <span className="uppercase">{role}</span> Account</h1>
        </div>
        {role && schoolId && <SignUpForm schoolId={schoolId} role={role} />}
      </div>
      <Footer />
    </div>
  )
}
