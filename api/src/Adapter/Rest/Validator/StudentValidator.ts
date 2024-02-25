import { ZodValidatorContract } from '@api/framework'
import {
  IStudentListFiltersDto,
  StudentListFiltersSchema,
  IStudentCreateDto,
  StudentCreateSchema,
  IStudentUpdateDto,
  StudentUpdateSchema
} from '../../../Application'

export class StudentValidator extends ZodValidatorContract {
  public async validateCreateSchema(payload: IStudentCreateDto): Promise<void> {
    return this.validateSchema<IStudentCreateDto>(StudentCreateSchema, payload)
  }

  public async validateQueryParams(payload: IStudentListFiltersDto): Promise<void> {
    return this.validateSchema<IStudentListFiltersDto>(StudentListFiltersSchema, payload)
  }

  public async validateUpdateSchema(payload: IStudentUpdateDto): Promise<void> {
    return this.validateSchema<IStudentUpdateDto>(StudentUpdateSchema, payload)
  }
}
