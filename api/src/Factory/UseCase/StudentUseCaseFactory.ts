import {
  StudentCreateUseCase,
  StudentDeleteUseCase,
  StudentListUseCase,
  StudentUpdateUseCase
} from '../../Application'
import { RepositoryFactory } from '../RepositoryFactory'

export class StudentUseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildCreate() {
    return new StudentCreateUseCase(this.repositoryFactory.buildStudentRepository())
  }

  public buildList() {
    return new StudentListUseCase(this.repositoryFactory.buildStudentRepository())
  }

  public buildUpdate() {
    return new StudentUpdateUseCase(this.repositoryFactory.buildStudentRepository())
  }

  public buildDelete() {
    return new StudentDeleteUseCase(
      this.repositoryFactory.buildStudentRepository(),
      this.repositoryFactory.buildUserRepository()
    )
  }
}
