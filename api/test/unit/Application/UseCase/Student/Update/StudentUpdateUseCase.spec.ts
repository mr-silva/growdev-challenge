import { IStudentRepository, Student, User } from '../../../../../../src/Domain'
import { IStudentUpdateDto, StudentUpdateUseCase } from '../../../../../../src/Application'
import {
  EXISTENT_STUDENT,
  STUDENT_ACADEMIC_REGISTRY,
  STUDENT_ID
} from '../../../../../mocks/StudentMocks'
import { AlreadyExistsException, DataNotFoundException } from '@api/framework'
import {
  USER_ID,
  USER_DOCUMENT_NUMBER,
  USER_EMAIL,
  USER_NAME
} from '../../../../../mocks/UserMocks'

const VALID_PAYLOAD: IStudentUpdateDto = {
  name: 'Jane Doe',
  email: 'janedoe@email.com'
}

let existentStudent: Student
describe('StudentUpdateUseCase', () => {
  let studentRepositoryMock: jest.Mocked<IStudentRepository>
  let studentUpdateUseCase: StudentUpdateUseCase

  beforeEach(() => {
    existentStudent = new Student(STUDENT_ACADEMIC_REGISTRY, STUDENT_ID).setUser(
      new User(USER_NAME, USER_DOCUMENT_NUMBER, USER_EMAIL, USER_ID)
    )

    studentRepositoryMock = {
      save: jest.fn(),
      getOneByEmail: jest.fn(),
      getOneById: jest.fn()
    } as unknown as jest.Mocked<IStudentRepository>

    studentUpdateUseCase = new StudentUpdateUseCase(studentRepositoryMock)

    studentRepositoryMock.getOneById.mockResolvedValue(Promise.resolve(existentStudent))
  })

  it('given that a student exists, when sending the CORRECT id and valid payload and there is NO user linked to the email, then it should update the student data', async () => {
    studentRepositoryMock.save.mockImplementationOnce(() => {
      return Promise.resolve(existentStudent)
    })

    const result = await studentUpdateUseCase.execute(STUDENT_ID, VALID_PAYLOAD)

    expect(studentRepositoryMock.save).toHaveBeenCalled()

    expect(result).toBeInstanceOf(Student)

    expect(existentStudent.getUser()!.getName()).toBe(VALID_PAYLOAD.name)
    expect(existentStudent.getUser()!.getEmail()).toBe(VALID_PAYLOAD.email)
  })

  it('given that a student exists, when sending the CORRECT id and valid payload and there is another user linked to the email, then it should NOT update the student data and return a AlreadyExistsException', async () => {
    studentRepositoryMock.getOneByEmail.mockResolvedValueOnce(Promise.resolve(existentStudent))

    const result = await studentUpdateUseCase.execute(STUDENT_ID, VALID_PAYLOAD)

    expect(studentRepositoryMock.save).not.toHaveBeenCalled()

    expect(result).toBeInstanceOf(AlreadyExistsException)

    expect(existentStudent.getUser()!.getName()).not.toBe(VALID_PAYLOAD.name)
    expect(existentStudent.getUser()!.getEmail()).not.toBe(VALID_PAYLOAD.email)
  })

  it('given that a student exists, when sending the INCORRECT id, then it should NOT update a student and return a DataNotFoundException', async () => {
    studentRepositoryMock.getOneById.mockResolvedValue(null)

    const result = await studentUpdateUseCase.execute(STUDENT_ID, VALID_PAYLOAD)

    expect(studentRepositoryMock.save).not.toHaveBeenCalled()
    expect(result).toBeInstanceOf(DataNotFoundException)
  })
})
