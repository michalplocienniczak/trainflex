'use client'
import { Container, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import AvatarDropdownMenu from './AvatarDropdownMenu'
import NavLinks from './NavLinks'

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="6" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AvatarDropdownMenu />
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar
