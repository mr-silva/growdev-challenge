import { DataNotFoundException } from '@api/framework'
import { StudentDeleteUseCase } from '../../../../../../src/Application'
import { IStudentRepository, IUserRepository } from '../../../../../../src/Domain'
import { EXISTENT_STUDENT, STUDENT_ID } from '../../../../../mocks/StudentMocks'

describe('StudentDeleteUseCase', () => {
  let studentRepositoryMock: jest.Mocked<IStudentRepository>
  let userRepositoryMock: jest.Mocked<IUserRepository>
  let studentDeleteUseCase: StudentDeleteUseCase

  beforeEach(() => {
    studentRepositoryMock = {
      getOneById: jest.fn()
    } as unknown as jest.Mocked<IStudentRepository>

    userRepositoryMock = {
      delete: jest.fn()
    } as unknown as jest.Mocked<IUserRepository>

    studentDeleteUseCase = new StudentDeleteUseCase(studentRepositoryMock, userRepositoryMock)
  })

  it('givent that a student exists, when passing the correct id it should delete the student', async () => {
    studentRepositoryMock.getOneById.mockResolvedValueOnce(EXISTENT_STUDENT)

    const result = await studentDeleteUseCase.execute(STUDENT_ID)

    expect(userRepositoryMock.delete).toHaveBeenCalled()
    expect(result).toBeTruthy()
    expect(result).not.toBeInstanceOf(DataNotFoundException)
  })

  it('givent that a student exists, when passing the incorrect id it should NOT delete the student and return a DataNotFoundException', async () => {
    studentRepositoryMock.getOneById.mockResolvedValueOnce(null)

    const result = await studentDeleteUseCase.execute(STUDENT_ID)

    expect(userRepositoryMock.delete).not.toHaveBeenCalled()
    expect(result).toBeInstanceOf(DataNotFoundException)
  })
})
