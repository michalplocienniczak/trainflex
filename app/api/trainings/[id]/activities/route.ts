import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { newActivitySchema } from '@/validationSchemas/activitySchema'

export async function GET(request: NextRequest, params: { id: string }) {
  const activities = await prisma.activity.findMany({
    where: {
      trainingId: params.id,
    },
    include: {
      user: true,
    },
  })

  return NextResponse.json(activities)
}

export async function POST(request: NextRequest, params: { id: string }) {
  const training = await prisma.training.findFirst({
    where: {
      id: params.id,
    },
    include: {
      activities: true,
    },
  })

  if (!training) {
    return NextResponse.json({ error: 'Training not found' }, { status: 404 })
  }

  const body = await request.json()

  const validation = newActivitySchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { userId, comment, time, burntCalories, dismissed } = body

  const newActivity = await prisma.activity.create({
    data: {
      trainingId: training.id,
      userId,
      comment,
      time,
      burntCalories,
      dismissed,
    },
  })

  if (!newActivity) {
    return NextResponse.json({ error: 'Activity not created' }, { status: 500 })
  }

  const updatedTraining = await prisma.training.update({
    where: {
      id: training.id,
    },
    data: {
      activities: {
        connect: [
          {
            id: newActivity.id,
          },
        ],
      },
    },
  })

  console.log(updatedTraining)

  return NextResponse.json(newActivity, { status: 201 })
}
