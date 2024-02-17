import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
    include: {
      group: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}
