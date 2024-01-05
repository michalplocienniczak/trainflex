import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Skeleton } from '..'
const AvatarDropdownMenu = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width="3" />

  if (status === 'unauthenticated')
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log in
      </Link>
    )

  return (
    <Box>
      {status === 'authenticated' && (
        <>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session!.user!.image!}
                alt={session!.user!.name!}
                className="cursor-pointer"
                fallback="?"
                radius="full"
                size="2"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session!.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </>
      )}
    </Box>
  )
}

export default AvatarDropdownMenu
