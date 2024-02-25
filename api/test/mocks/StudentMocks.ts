import { Student } from '../../src/Domain'
import { EXISTENT_USER } from './UserMocks'

export const STUDENT_ID = '13e43e0d-f95e-4014-b850-a6e4314506a3'
export const STUDENT_ACADEMIC_REGISTRY = '7243227'

export const EXISTENT_STUDENT = new Student(STUDENT_ACADEMIC_REGISTRY, STUDENT_ID).setUser(
  EXISTENT_USER
)
