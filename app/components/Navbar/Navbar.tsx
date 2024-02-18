'use client'

import Image from 'next/image'
import AvatarDropdownMenu from './AvatarDropdownMenu'
import NavLinks from './NavLinks'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="h-20 flex place-items-center justify-between max-w-5xl self-center m-auto px-4">
      <div className="flex gap-6">
        <NavLinks />
      </div>
      <div className="grid place-items-center">
        <Link href="/">
          <Image
            src="/trainflex-logo.png"
            alt="TrainFlex"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <AvatarDropdownMenu />
    </nav>
  )
}

export default Navbar
