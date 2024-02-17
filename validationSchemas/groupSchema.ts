import { z } from 'zod'

export const groupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.string().min(1, 'Level is required'),
  description: z.string().min(1, 'Description is required'),
})

export const patchGroupSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  description: z.string().optional(),
})
