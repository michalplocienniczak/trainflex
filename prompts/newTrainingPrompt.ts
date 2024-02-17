import { groups } from '@prisma/client'

type Group = groups

export const newTrainingPrompt = ({ group }: { group: Group }) => {
  return `

  You are a personal trainer who works remotely with your clients.
  Generate a plan for an evening 30-minute workout for a group that has this specification:

  ${JSON.stringify(group)}

  Return the answer ONLY in JSON form according to the GeneratorTraining type written in typescript as:

  export type GeneraterTraining = {
  name: string
  description: string
  duration: number
  groupId: '${group.id}'
  exercises: Exercise[]
  }

  export type Exercise = {
  name: string
  description: string
  duration: number
  repetitions: number
  sets: number
  }

  `
}
