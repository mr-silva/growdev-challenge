import { z } from 'zod'

export const StudentCreateSchema = z.object({
  name: z.string().trim().min(1),
  documentNumber: z.string().regex(/^[0-9]{11}$/, 'Only numbers accepted.'),
  email: z.string().trim().email()
})

export type IStudentCreateDto = z.infer<typeof StudentCreateSchema>
