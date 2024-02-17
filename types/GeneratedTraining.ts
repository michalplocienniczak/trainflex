export type GeneraterTraining = {
  name: string
  description: string
  duration: number
  exercises: Exercise[]
}

export type Exercise = {
  name: string
  description: string
  duration: number
  repetitions: number
  sets: number
}
