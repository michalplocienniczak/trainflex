import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/auth/authOptions'
import { groupSchema } from '@/validationSchemas'

export async function GET(request: NextRequest) {
  const groups = await prisma.groups.findMany({ orderBy: { name: 'asc' } })

  return NextResponse.json(groups)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = groupSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newGroup = await prisma.groups.create({
    data: {
      name: body.name,
      description: body.description,
      level: body.level,
    },
  })

  return NextResponse.json(newGroup, { status: 201 })
}
