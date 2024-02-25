import { EntityDataMapperContract } from '@api/framework'
import { Student } from '../../../../../../../Domain'
import { StudentEntity } from '../../Entity'
import { StudentDataMapper } from '../StudentDataMapper'
import { UserDataMapper } from '../UserDataMapper'

class StudentDataMapperMediator extends EntityDataMapperContract<Student, StudentEntity> {
  constructor(
    private readonly studentDataMapper: StudentDataMapper,
    private readonly userDataMapper: UserDataMapper
  ) {
    super()
  }

  toDomain(entity: StudentEntity): Student {
    const domain = this.studentDataMapper.toDomain(entity)

    if (entity.user) {
      domain.setUser(this.userDataMapper.toDomain(entity.user))
    }

    return domain
  }

  toDaoEntity(domain: Student): StudentEntity {
    const entity = this.studentDataMapper.toDaoEntity(domain)

    if (domain.getUser()) {
      entity.user = this.userDataMapper.toDaoEntity(domain.getUser()!)
    }

    return entity
  }
}

export const studentDataMapperMediator = new StudentDataMapperMediator(
  new StudentDataMapper(),
  new UserDataMapper()
)
