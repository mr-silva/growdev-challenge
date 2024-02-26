import { Request, Response, NextFunction } from 'express'
import { Factory } from '../../../Factory'
import { StudentValidator } from '../Validator'
import { StudentPresenter } from '../../Presenter'

export class StudentController {
  public async create(request: Request, response: Response, next: NextFunction) {
    try {
      // await new StudentValidator().validateCreateSchema(request.body)

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildStudentUseCase()
        .buildCreate()
        .execute(request.body)

      new StudentPresenter(result, 'created').present(response)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async list(request: Request, response: Response, next: NextFunction) {
    try {
      await new StudentValidator().validateQueryParams(request.query)

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildStudentUseCase()
        .buildList()
        .execute(request.query)

      new StudentPresenter(result).present(response)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async update(request: Request, response: Response, next: NextFunction) {
    try {
      await new StudentValidator().validateUpdateSchema(request.body)

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildStudentUseCase()
        .buildUpdate()
        .execute(request.params.id, request.body)

      new StudentPresenter(result).present(response)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildStudentUseCase()
        .buildDelete()
        .execute(request.params.id)

      new StudentPresenter(result).present(response)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
