import { AlreadyExistsException, DataNotFoundException } from '@api/framework'
import { IStudentRepository, Student } from '../../../../Domain'
import { IStudentUpdateDto } from './IStudentUpdateDto'

export class StudentUpdateUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  public async execute(
    id: string,
    dto: IStudentUpdateDto
  ): Promise<Student | AlreadyExistsException | DataNotFoundException> {
    const student = await this.studentRepository.getOneById(id)

    if (!student) {
      return new DataNotFoundException('Student not found.')
    }

    const user = student.getUser()!

    if (dto.email && dto.email !== user.getEmail()) {
      const isNewEmailBeignUsed = await this.validateIfEmailIsBeignUsedAlready(dto.email)

      if (isNewEmailBeignUsed) {
        return new AlreadyExistsException('Student already exists.')
      }

      user.setEmail(dto.email)
    }

    if (dto.name) {
      user.setName(dto.name)
    }

    student.setUser(user)

    const updatedStudent = await this.studentRepository.save(student)

    return updatedStudent
  }

  private async validateIfEmailIsBeignUsedAlready(email: string): Promise<boolean> {
    const student = await this.studentRepository.getOneByEmail(email)

    if (student) {
      return true
    }

    return false
  }
}
