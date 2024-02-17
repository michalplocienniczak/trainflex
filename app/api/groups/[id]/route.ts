import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/auth/authOptions'
import { patchGroupSchema } from '@/validationSchemas'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = patchGroupSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const group = await prisma.groups.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!group)
    return NextResponse.json({ error: 'Group not found' }, { status: 404 })

  const { name, description, level } = body

  const updatedGroup = await prisma.groups.update({
    where: {
      id: group.id,
    },
    data: {
      name,
      description,
      level,
    },
  })

  return NextResponse.json(updatedGroup)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const group = await prisma.groups.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!group)
    return NextResponse.json({ error: 'Group not found' }, { status: 404 })

  await prisma.groups.delete({
    where: {
      id: group.id,
    },
  })

  return NextResponse.json({})
}
