import { randomUUID } from 'crypto'

export abstract class Base {
  protected id: string

  constructor(id?: string, protected createdAt?: Date, protected updatedAt?: Date) {
    this.id = id || randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }
}
