import { Response } from 'express'
import {
  AlreadyExistsException,
  DataNotFoundException,
  HttpStatusEnum,
  PaginatedList,
  ResponseEntity
} from '@api/framework'
import { Student } from '../../../Domain'
import { StudentView } from './StudentView'

export class StudentPresenter {
  constructor(
    private result:
      | Student
      | PaginatedList<Student>
      | AlreadyExistsException
      | DataNotFoundException
      | boolean,
    private action: 'created' | 'ok' = 'ok'
  ) {}

  public present(response: Response) {
    const responseEntity = new ResponseEntity(response)

    if (this.result instanceof Student) {
      if (this.action === 'created') {
        return responseEntity.created(new StudentView().render(this.result))
      }

      return responseEntity.ok(new StudentView().render(this.result))
    }

    if (this.result instanceof PaginatedList<Student>) {
      return responseEntity.list(
        new StudentView().renderMany(this.result.getItems(), true),
        this.result.getTotal()
      )
    }

    if (this.result instanceof AlreadyExistsException) {
      return responseEntity.error(HttpStatusEnum.CONFLICT, this.result)
    }

    if (this.result instanceof DataNotFoundException) {
      return responseEntity.error(HttpStatusEnum.NOT_FOUND, this.result)
    }

    return responseEntity.noContent()
  }
}
