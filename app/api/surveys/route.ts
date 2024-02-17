import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/auth/authOptions'
import { surveySchema } from '@/validationSchemas'

export async function GET(request: NextRequest) {
  const surveys = await prisma.survey.findMany()

  return NextResponse.json(surveys)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = surveySchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newSurvey = await prisma.survey.create({
    data: {
      questions: body.questions,
      userId: body.userId,
      trainingID: body.trainingID
    },
  })

  return NextResponse.json(newSurvey, { status: 201 })
}
