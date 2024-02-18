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
      label: <Link href="/me">{session!.user!.email}</Link>,
    },
    {
      key: 'logout',
      label: <Link href="/api/auth/signout">Log out</Link>,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Avatar
        src={session!.user!.image!}
        alt={session!.user!.name!}
        className="cursor-pointer"
      >
        ?
      </Avatar>
    </Dropdown>
  )
}

export default AvatarDropdownMenu
