'use client'

import Image from "next/image"
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useState } from "react"
import { MenuButtonStyle, MobileMenuButtonStyle } from "../styles"
import { signOut, useSession } from "next-auth/react"

export const AuthedMenu = () => {
  const { data: session, status } = useSession()
  console.log(session, status)

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(false)
  const [openedContent, setOpenedContent] = useState("")

  return (
    <div className="fixed w-screen">
      <button onClick={() => { setOpen(!open); setContent(false); setOpenedContent("") }} className="block md:hidden absolute z-10 top-2 right-2 w-8 h-8 bg-primary rounded-sm p-1 focus:bg-secondary transition-all">
        {open ? <Cross2Icon className="text-white w-full h-full" /> : <HamburgerMenuIcon className="text-white w-full h-full" />}
      </button>
      <div className="flex md:hidden border-b  bg-white border-primary shadow-md h-12 relative top-0 w-full">
        <div className="h-12 py-2 px-4 border-r border-primary">
          <Image className="w-full h-full" src={"/favicon.svg"} alt="logo" width={500} height={500} priority />
        </div>
      </div>
      <div className={`${open ? "h-[265px]" : "h-0"} flex md:hidden w-full transition-all overflow-hidden p-1`}>
        <div className="flex w-1/2 justify-start flex-col gap-0 border-x border-primary rounded-sm overflow-hidden shadow-md transition-all">
          <button onClick={() => { setContent(openedContent === "dashboard" ? !content : openedContent === "" ? !content : true); setOpenedContent("dashboard") }} className={MobileMenuButtonStyle}>
            My DashBoard {">"}
          </button>
          <Link href="/school" className={MobileMenuButtonStyle}>
            My School
          </Link>
          <Link href="/" className={MobileMenuButtonStyle}>
            Home
          </Link>
          <Link href="/school" className={MobileMenuButtonStyle}>
            Explore
          </Link>
          <Link href="/school" className={MobileMenuButtonStyle}>
            News
          </Link>
          <Link href="/school" className={MobileMenuButtonStyle}>
            Documentation
          </Link>
          <button onClick={() => { setContent(openedContent === "profile" ? !content : openedContent === "" ? !content : true); setOpenedContent("profile") }} className={MobileMenuButtonStyle}>
            Profile {">"}
          </button>
        </div>
        {openedContent === "dashboard" ?
          <div className={`${content ? "h-[110px]" : "h-0"} flex md:hidden w-1/2 flex-col shadow-md overflow-hidden`}>
            <Link href="/school" className={MobileMenuButtonStyle}>
              Manage School
            </Link>
            <Link href="/school" className={MobileMenuButtonStyle}>
              Manage Staff
            </Link>
            <Link href="/school" className={MobileMenuButtonStyle}>
              Manage Students
            </Link>
          </div> :
          openedContent === "profile" ?
            <div className={`${content ? "h-[110px]" : "h-0"} flex md:hidden w-1/2 flex-col shadow-md overflow-hidden`}>
              <Link href="/school" className={MobileMenuButtonStyle}>
                My Profile
              </Link>
              <Link href="/login" className={MobileMenuButtonStyle}>
                Change Role
              </Link>
              <button onClick={() => signOut()} className={MobileMenuButtonStyle}>
                Logout
              </button>
            </div> : null}
      </div>


      <div className='hidden relative  bg-white top-0 w-full h-auto border-b border-primary md:flex hover:border-secondary shadow-md transition-all'>
        <div className=" w-1/5 p-2 border-r border-inherit">
          <Image src="/logo.svg" alt="logo" width={500} height={500} />
        </div>
        <div className="flex w-4/5 justify-center">
          <NavigationMenu className="px-2 text-primary">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>My DashBoard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex p-1">
                    <Link href="/school" className={MenuButtonStyle}>
                      Manage School
                    </Link>
                    <Link href="/school" className={MenuButtonStyle}>
                      Manage Staff
                    </Link>
                    <Link href="/school" className={MenuButtonStyle}>
                      Manage Students
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/school" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My School
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/explore" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Explore
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex p-1">
                    <Link href="/profile" className={MenuButtonStyle}>
                      My Profile
                    </Link>
                    <Link href="/login" className={MenuButtonStyle}>
                      Change Role
                    </Link>
                    <button onClick={() => signOut()} className={MenuButtonStyle}>
                      Logout
                    </button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}