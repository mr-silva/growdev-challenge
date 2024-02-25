import { TypeORMMySQLDatabase, StudentRepository, UserRepository } from '../Drivers/Database'

export class RepositoryFactory {
  constructor() {}

  public buildStudentRepository() {
    return new StudentRepository(TypeORMMySQLDatabase.getConnection())
  }

  public buildUserRepository() {
    return new UserRepository(TypeORMMySQLDatabase.getConnection())
  }
}
