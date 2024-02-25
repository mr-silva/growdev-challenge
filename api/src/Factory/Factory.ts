import { RepositoryFactory } from './RepositoryFactory'
import { UseCaseFactory } from './UseCaseFactory'

export class Factory {
  private static instance: Factory

  public static getInstance(): Factory {
    if (!Factory.instance) Factory.instance = new Factory()

    return Factory.instance
  }

  public buildRepositoryFactory(): RepositoryFactory {
    return new RepositoryFactory()
  }

  public buildUseCaseFactory(): UseCaseFactory {
    return new UseCaseFactory(this.buildRepositoryFactory())
  }
}
