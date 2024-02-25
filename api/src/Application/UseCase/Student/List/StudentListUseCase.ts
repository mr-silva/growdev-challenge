import { PaginatedList, PaginatedListFiltersDTO } from '@api/framework'
import { IStudentRepository, Student, StudentSearcheableFiltersDTO } from '../../../../Domain'
import { IStudentListFiltersDto } from './IStudentListFiltersDto'

export class StudentListUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  public async execute(dto: IStudentListFiltersDto): Promise<PaginatedList<Student>> {
    const filters = new StudentSearcheableFiltersDTO(dto.query)

    return await this.studentRepository.getPaginatedList(
      filters,
      new PaginatedListFiltersDTO(dto.page, dto.size)
    )
  }
}
