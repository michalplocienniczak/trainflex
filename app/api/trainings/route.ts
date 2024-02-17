import { newTrainingPrompt } from '@/prompts/newTrainingPrompt'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import OpenAI from 'openai'
import { newTrainingSchema } from '@/validationSchemas/trainingSchema'

const openai = new OpenAI()

export async function GET(request: NextRequest) {
  const trainings = await prisma?.training.findMany()

  return NextResponse.json(trainings)
}

export async function POST(request: NextRequest) {
  const group = await prisma?.groups.findFirst()

  if (!group) {
    return NextResponse.json({ error: 'Group not found' }, { status: 404 })
  }

  console.log('group', group)
  console.log(
    newTrainingPrompt({
      group,
    })
  )

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: newTrainingPrompt({
          group,
        }),
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const training = JSON.parse(response.choices[0].message.content || '')

  const validation = newTrainingSchema.safeParse(training)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 500 })

  const newTraining = await prisma.training.create({
    data: {
      ...training,
    },
  })

  return NextResponse.json(newTraining, { status: 201 })
}
