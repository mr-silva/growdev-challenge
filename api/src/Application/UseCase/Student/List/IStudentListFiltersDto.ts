import { z } from 'zod'

export const StudentListFiltersSchema = z.object({
  query: z.string().trim().optional(),
  page: z.preprocess(Number, z.number().nonnegative().optional()),
  size: z.preprocess(Number, z.number().min(1).max(50).optional())
})

export type IStudentListFiltersDto = z.infer<typeof StudentListFiltersSchema>
