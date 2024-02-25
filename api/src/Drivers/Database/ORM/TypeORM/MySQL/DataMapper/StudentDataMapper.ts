import { EntityDataMapperContract } from '@api/framework'
import { Student } from '../../../../../../Domain'
import { StudentEntity } from '../Entity'

export class StudentDataMapper extends EntityDataMapperContract<Student, StudentEntity> {
  toDomain(entity: StudentEntity): Student {
    return new Student(entity.academicRegistry, entity.id, entity.createdAt, entity.updatedAt)
  }

  toDaoEntity(domain: Student): StudentEntity {
    return new StudentEntity(domain.getAcademicRegistry(), domain.getId())
  }
}
