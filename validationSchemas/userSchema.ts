import { z } from 'zod'

export const pathUserSchema = z.object({
  name: z.string().optional(),
  groupId: z.string().optional(),
})
