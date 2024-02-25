import { randomInt } from 'crypto'
import { Base } from './Base'
import { User } from './User'

export class Student extends Base {
  private academicRegistry: string
  private user?: User

  constructor(academicRegistry?: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt)

    this.academicRegistry = academicRegistry || randomInt(9999999).toString().padStart(7, '0')
  }

  public getAcademicRegistry(): string {
    return this.academicRegistry
  }

  public setUser(user: User): this {
    this.user = user
    return this
  }

  public getUser(): User | undefined {
    return this.user
  }
}
