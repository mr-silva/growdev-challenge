import { DataNotFoundException } from '@api/framework'
import { IStudentRepository, IUserRepository } from '../../../../Domain'

export class StudentDeleteUseCase {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(id: string): Promise<boolean | DataNotFoundException> {
    const student = await this.studentRepository.getOneById(id)

    if (!student) {
      return new DataNotFoundException('Student not found.')
    }

    await this.userRepository.delete(student.getUser()!.getId())

    return true
  }
}
