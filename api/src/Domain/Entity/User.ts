import { Base } from './Base'

export class User extends Base {
  constructor(
    private name: string,
    private documentNumber: string,
    private email: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  public getName(): string {
    return this.name
  }

  public getDocumentNumber(): string {
    return this.documentNumber
  }

  public getEmail(): string {
    return this.email
  }

  public setName(name: string): this {
    this.name = name
    return this
  }

  public setEmail(email: string): this {
    this.email = email
    return this
  }
}
