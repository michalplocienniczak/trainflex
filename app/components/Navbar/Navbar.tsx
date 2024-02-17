'use client'

import Image from 'next/image'
import AvatarDropdownMenu from './AvatarDropdownMenu'
import NavLinks from './NavLinks'

const Navbar = () => {
  return (
    <nav className="h-20 flex place-items-center justify-between max-w-5xl self-center m-auto">
      <div className="flex gap-6">
        <NavLinks />
      </div>
      <div className="grid place-items-center">
        <Image
          src="/trainflex-logo.png"
          alt="TrainFlex"
          width={70}
          height={70}
        />
      </div>
      <AvatarDropdownMenu />
    </nav>
  )
}

export default Navbar
