import { z } from 'zod'

export const StudentUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional()
})

export type IStudentUpdateDto = z.infer<typeof StudentUpdateSchema>
