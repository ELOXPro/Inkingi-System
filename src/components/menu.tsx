import { UnAuthedMenu } from "./menus/unauthedMenu"
import { AuthedMenu } from "./menus/authedMenu"
import { Session } from "next-auth"

type Props = {
  session: Session | null,
}

export const Menu = (props:Props) => {
 const {session} = props

  return (
    <>
    {session ? <AuthedMenu /> : <UnAuthedMenu />}
    </>
  )
}