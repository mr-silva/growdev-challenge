import { IStudentRepository, Student } from '../../../../../../src/Domain'
import { IStudentCreateDto, StudentCreateUseCase } from '../../../../../../src/Application'
import { AlreadyExistsException } from '@api/framework'
import { USER_DOCUMENT_NUMBER, USER_EMAIL, USER_NAME } from '../../../../../mocks/UserMocks'
import { EXISTENT_STUDENT } from '../../../../../mocks/StudentMocks'

const VALID_PAYLOAD: IStudentCreateDto = {
  name: USER_NAME,
  documentNumber: USER_DOCUMENT_NUMBER,
  email: USER_EMAIL
}

describe('StudentCreateUseCase', () => {
  let studentRepositoryMock: jest.Mocked<IStudentRepository>
  let studentCreateUseCase: StudentCreateUseCase

  beforeEach(() => {
    studentRepositoryMock = {
      create: jest.fn(),
      getOneByEmailOrDocumentNumber: jest.fn()
    } as unknown as jest.Mocked<IStudentRepository>

    studentCreateUseCase = new StudentCreateUseCase(studentRepositoryMock)
  })

  it('given a valid payload and that there is NO existent user with the same data, then it should create a new Student', async () => {
    const result = await studentCreateUseCase.execute(VALID_PAYLOAD)

    expect(studentRepositoryMock.create).toHaveBeenCalled()
    expect(result).toBeInstanceOf(Student)
  })

  it('given a valid payload and that there is a existen user with the same data, the it should NOT create a new Student and return a AlreadyExistsException', async () => {
    studentRepositoryMock.getOneByEmailOrDocumentNumber.mockResolvedValueOnce(
      Promise.resolve(EXISTENT_STUDENT)
    )

    const result = await studentCreateUseCase.execute(VALID_PAYLOAD)

    expect(studentRepositoryMock.create).not.toHaveBeenCalled()
    expect(result).toBeInstanceOf(AlreadyExistsException)
  })
})
