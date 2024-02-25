import { IRepository } from '@api/framework'
import { Student } from '../../Entity'

export interface IStudentRepository extends IRepository<Student> {
  getOneByEmailOrDocumentNumber(email: string, documentNumber: string): Promise<Student | null>
  getOneByEmail(email: string): Promise<Student | null>
}
