import { RepositoryFactory } from './RepositoryFactory'
import { StudentUseCaseFactory } from './UseCase/StudentUseCaseFactory'

export class UseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildStudentUseCase() {
    return new StudentUseCaseFactory(this.repositoryFactory)
  }
}
