'use client'

import Image from 'next/image'
import AvatarDropdownMenu from './AvatarDropdownMenu'
import NavLinks from './NavLinks'
import Link from 'next/link'
import { useUserData } from '@/hooks'
import { useSession } from 'next-auth/react'
import { VscFlame } from 'react-icons/vsc'

const Navbar = () => {
  const { data: session } = useSession()

  const { data } = useUserData({ email: session?.user?.email })

  const showStreak = Boolean(data?.streak && data?.streak > 0)

  return (
    <nav className="h-20 flex place-items-center justify-between max-w-5xl self-center m-auto px-4">
      <div className="flex gap-2 place-items-center text-red-600">
        {showStreak && (
          <>
            <VscFlame size={20} />
            <span>{data?.streak}</span>
          </>
        )}
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
