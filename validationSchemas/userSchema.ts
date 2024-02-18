import { z } from 'zod'

export const pathUserSchema = z.object({
  name: z.string().optional().nullable(),
  groupId: z.string().optional(),
})
