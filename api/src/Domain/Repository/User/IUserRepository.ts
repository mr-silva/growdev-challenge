import { IRepository } from '@api/framework'
import { User } from '../../Entity'

export interface IUserRepository extends IRepository<User> {}
