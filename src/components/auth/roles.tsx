'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { UserSession } from "../Interfaces"

export default function Roles() {
  
  const router = useRouter()
  const {data:session} = useSession()
  const user: UserSession | null = session as UserSession


  function handleRole(role: string) {
    router.push(`/${role}`)
  }

  return (
    <>
    {user ? <div className="flex flex-col items-center justify-center w-full h-auto gap-2">
      <h1 className="text-xl font-bold capitalize text-zinc-400">Welcome Back, {user?.user.name} !</h1>
      <h1 className="text-xl font-bold capitalize text-secondary">continue as</h1>
      {user?.user.roles.map((role) => (
        <Button key={role.role} onClick={() => handleRole(role.role)} variant={"outline"} className="uppercase w-24">{role.role}</Button>
      ))}
    </div>: <h1 className="text-xl font-bold capitalize text-secondary animate-pulse duration-300">Loading</h1>}
    </>
  )
}