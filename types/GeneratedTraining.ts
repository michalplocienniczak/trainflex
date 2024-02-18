import { Activity } from '@prisma/client'

export type Training = {
  id: string
  name: string
  description: string
  duration: number
  exercises: Exercise[]
  activities: Activity[]
}

export type Exercise = {
  name: string
  description: string
  duration: number
  repetitions: number
  sets: number
}
