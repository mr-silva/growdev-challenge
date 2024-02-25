import { ViewContract } from '@api/framework'
import { Student } from '../../../Domain'

export class StudentView extends ViewContract<Student, IStudentView> {
  render(entity: Student, isList?: boolean | undefined): IStudentView {
    return {
      id: entity.getId(),
      name: entity.getUser()!.getName(),
      documentNumber: entity.getUser()!.getDocumentNumber(),
      academicRegistry: entity.getAcademicRegistry()
    }
  }
}

interface IStudentView {
  id: string
  name: string
  academicRegistry: string
  documentNumber: string
}
