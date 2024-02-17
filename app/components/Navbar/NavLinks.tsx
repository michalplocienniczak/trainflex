import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const NavLinks = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <MenuOutlined onClick={() => setOpen(true)} className="text-xl" />
      <Drawer
        open={open}
        title="Menu"
        onClose={() => setOpen(false)}
        placement="left"
      >
        <Link
          href="/"
          className={classNames({
            'text-zinc-900': pathname === '/',
            'text-zinc-500': pathname !== '/',
          })}
        >
          Home
        </Link>
      </Drawer>
    </>
  )
}

export default NavLinks
