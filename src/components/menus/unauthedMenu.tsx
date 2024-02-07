'use client'

import Image from "next/image"
import Link from "next/link"
import { NavigationMenu,NavigationMenuItem, NavigationMenuLink, NavigationMenuList,navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useState } from "react"
import {MobileMenuButtonStyle } from "../styles"
import { Button } from "../ui/button"

export const UnAuthedMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed w-screen">
      <button onClick={() => setOpen(!open)} className="block md:hidden absolute z-10 top-2 right-2 w-8 h-8 bg-primary rounded-sm p-1 focus:bg-secondary transition-all">
        {open ? <Cross2Icon className="text-white w-full h-full" /> : <HamburgerMenuIcon className="text-white w-full h-full" />}
      </button>
      <div className="flex md:hidden border-b  bg-white border-primary shadow-md h-12 relative top-0 w-full">
        <div className="h-12 py-2 px-4 border-r border-primary">
          <Image className="w-full h-full" src={"/favicon.svg"} alt="logo" width={500} height={500} priority />
        </div>
      </div>
      <div className={`${open ? "h-[228px]" : "h-0"} flex md:hidden w-full transition-all overflow-hidden p-1`}>
        <div className="flex w-1/2 justify-start flex-col gap-0 border-x border-primary rounded-sm overflow-hidden shadow-md transition-all">
          <Link onClick={() => setOpen(false)} href="/" className={MobileMenuButtonStyle}>
            Home
          </Link>
          <Link onClick={() => setOpen(false)} href="/school" className={MobileMenuButtonStyle}>
            Explore
          </Link>
          <Link onClick={() => setOpen(false)} href="/school" className={MobileMenuButtonStyle}>
            News
          </Link>
          <Link onClick={() => setOpen(false)} href="/pricing" className={MobileMenuButtonStyle}>
            Pricing
          </Link>
          <Link onClick={() => setOpen(false)} href="/login" className={MobileMenuButtonStyle}>
            Login
          </Link>
          <Link onClick={() => setOpen(false)} href="/register" className={MobileMenuButtonStyle}>
            Get Started
          </Link>
        </div>
      </div>

      <div className='hidden relative  bg-white top-0 w-full h-auto border-b border-primary md:flex hover:border-secondary shadow-md transition-all'>
        <div className=" w-1/5 p-2 border-r border-inherit">
          <Image src="/logo.svg" alt="logo" width={500} height={500} />
        </div>
        <div className="flex w-4/5 justify-center">
          <NavigationMenu className="px-2 text-primary">
            <NavigationMenuList>
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
                <Link href="/login" legacyBehavior passHref>
                  <Button>
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/register" legacyBehavior passHref>
                  <Button variant={"secondary"}>
                    Get Started
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}