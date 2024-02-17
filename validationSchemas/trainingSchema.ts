import { z } from 'zod'

export const newTrainingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.number().min(1, 'Duration is required'),
  groupId: z.string().min(1, 'Group is required'),
  exercises: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      duration: z.number().min(1, 'Duration is required'),
      repetitions: z.number().min(0, 'Repetitions is required'),
      sets: z.number().min(0, 'Sets is required'),
    })
  ),
})
