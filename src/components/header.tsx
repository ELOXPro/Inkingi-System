import { Menu } from "./menu"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Provider from "./provider"


export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <Provider>
      <Menu session={session}/>
    </Provider>
  )
}
