import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const training = await prisma.training.findFirst({
    where: {
      groupId: params.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      activities: true,
    },
  })

  if (!training) {
    return NextResponse.json({ error: 'Training not found' }, { status: 404 })
  }

  return NextResponse.json(training)
}
