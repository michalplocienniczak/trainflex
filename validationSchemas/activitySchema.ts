import { z } from 'zod'

export const newActivitySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  comment: z.string().optional(),
  time: z.number().optional(),
  burntCalories: z.number().optional(),
  dismissed: z.boolean().optional(),
})
