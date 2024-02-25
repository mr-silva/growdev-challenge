import { EntityDataMapperContract } from '@api/framework'
import { User } from '../../../../../../Domain'
import { UserEntity } from '../Entity'

export class UserDataMapper extends EntityDataMapperContract<User, UserEntity> {
  toDomain(entity: UserEntity): User {
    return new User(
      entity.name,
      entity.documentNumber,
      entity.email,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: User): UserEntity {
    return new UserEntity(
      domain.getName(),
      domain.getDocumentNumber(),
      domain.getEmail(),
      domain.getId()
    )
  }
}
