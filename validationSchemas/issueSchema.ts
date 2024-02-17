import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required')
    .optional()
    .nullable(),
})
