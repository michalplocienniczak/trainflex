import { z } from 'zod'

export const surveySchema = z.object({
    questions: z.array(
        z.object({
            "label": z.string().min(1, "Label is required"),
            "answer": z.string().min(1, "Answer is required")
        })
    ),
    trainingID: z.string().min(1, 'TrainingID is required'),
    userId: z.string().min(1, 'UserId is required')
})