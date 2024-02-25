import { AlreadyExistsException } from '@api/framework'
import { IStudentRepository, Student, User } from '../../../../Domain'
import { IStudentCreateDto } from './IStudentCreateDto'

export class StudentCreateUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  public async execute(dto: IStudentCreateDto): Promise<Student | AlreadyExistsException> {
    const existentUser = await this.validateIfStudentAlreadyExists(dto.email, dto.documentNumber)

    if (existentUser) {
      return new AlreadyExistsException('Student already exists.')
    }

    const user = new User(dto.name, dto.documentNumber, dto.email)
    const student = new Student().setUser(user)

    await this.studentRepository.create(student)

    return student
  }

  private async validateIfStudentAlreadyExists(
    email: string,
    documentNumber: string
  ): Promise<boolean> {
    const student = await this.studentRepository.getOneByEmailOrDocumentNumber(
      email,
      documentNumber
    )

    if (student) {
      return true
    }

    return false
  }
}
