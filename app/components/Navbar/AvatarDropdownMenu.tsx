'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Skeleton } from '..'
import { Dropdown, Button, Avatar, MenuProps } from 'antd'

const AvatarDropdownMenu = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width="3" />

  if (status === 'unauthenticated')
    return (
      <Link href="/api/auth/signin" className="nav-link">
        <Button>Log in</Button>
      </Link>
    )

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: session!.user!.email,
      className: 'cursor-default text-gray-500 hover:bg-white!',
    },
    {
      key: 'logout',
      label: <Link href="/api/auth/signout">Log out</Link>,
      className: 'bg-yellow-300 text-black',
    },
  ]

  return (
    <Dropdown menu={{ items }}>
      <Avatar src={session!.user!.image!} alt={session!.user!.name!}>
        ?
      </Avatar>
    </Dropdown>
  )
}

export default AvatarDropdownMenu
