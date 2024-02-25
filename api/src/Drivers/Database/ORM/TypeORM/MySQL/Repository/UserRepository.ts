import { DataSource } from 'typeorm'
import { TypeORMMySQLRepositoryContract } from '@api/framework'
import { User, IUserRepository } from '../../../../../../Domain'
import { UserEntity } from '../Entity/UserEntity'
import { UserDataMapper } from '../DataMapper'

export class UserRepository
  extends TypeORMMySQLRepositoryContract<User, UserEntity>
  implements IUserRepository
{
  constructor(connection: DataSource) {
    super(connection.getRepository(UserEntity), new UserDataMapper())
  }
}
