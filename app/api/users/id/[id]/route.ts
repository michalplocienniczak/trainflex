import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/auth/authOptions'
import { pathUserSchema } from '@/validationSchemas/userSchema'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = pathUserSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { name, groupId } = body

  const updatedGroup = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      groupId,
    },
  })

  return NextResponse.json(updatedGroup)
}
