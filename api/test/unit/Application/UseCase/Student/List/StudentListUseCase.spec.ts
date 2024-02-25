import { PaginatedList } from '@api/framework'
import { StudentListUseCase } from '../../../../../../src/Application'
import { IStudentRepository, Student } from '../../../../../../src/Domain'
import { EXISTENT_STUDENT } from '../../../../../mocks/StudentMocks'

describe('StudentListUseCase', () => {
  let studentRepositoryMock: jest.Mocked<IStudentRepository>
  let studentListUseCase: StudentListUseCase

  beforeEach(() => {
    studentRepositoryMock = {
      getPaginatedList: jest.fn()
    } as unknown as jest.Mocked<IStudentRepository>

    studentListUseCase = new StudentListUseCase(studentRepositoryMock)
  })

  it('given that there exist entries in the database, then it should return the listing of the Students', async () => {
    studentRepositoryMock.getPaginatedList.mockResolvedValueOnce(
      Promise.resolve(new PaginatedList([EXISTENT_STUDENT], 1))
    )

    const result = await studentListUseCase.execute({})

    expect(result.getItems()).toHaveLength(1)
    expect(result.getTotal()).toBe(1)
  })

  it('given that there is NOT entry in the database, then it should return a empty listing', async () => {
    studentRepositoryMock.getPaginatedList.mockResolvedValueOnce(
      Promise.resolve(new PaginatedList([], 0))
    )

    const result = await studentListUseCase.execute({})

    expect(result.getItems()).toHaveLength(0)
    expect(result.getTotal()).toBe(0)
  })
})
